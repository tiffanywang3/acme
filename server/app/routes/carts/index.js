'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose')

var Cart = require('../../../db/models/cart');
var User = require('../../../db/models/user');
var Product = require('../../../db/models/product');

// Get all carts
router.get('/all', function(req, res, next){
    Cart.find()
        .then(function(carts){
            res.send(carts);
        })
        .then(null, next);
})

// Get one cart based on guest/user session
router.get('/', function(req, res, next){
    if(req.user) {
        Cart.findById(req.user.active_cart)
        .populate('items.product').exec()
        .then(function(cart){
            res.send(cart);
        })
        .then(null, next);
    }
    else {
        var guestCart = new Cart({guest_id: req.session.id, items: req.session.items, status:"active"}).populate('items.product')
        .execPopulate()
        .then(function(cart) {
            res.send(cart);
        })
    }
})




router.get('/:id', function(req,res,next) {
    console.log("GOT IN HERE")
    Cart.findById(req.params.id)
    .populate('items.product').exec()
    .then(function(cart){
        res.send(cart);
    })
    .then(null, next);
})

// From product page
// Add item to items list
// req.body 

//[{product: "23XSF43VREG", quantity: 2, price:}, {product: "SDSDA"}, ]

router.post('/item/:productId', function(req, res, next){
    if(req.user) {
        Cart.findById(req.user.active_cart)
            .then(function(cart){
                var index =  _.findIndex(cart.items, function(item) {
                    return item.product.equals(req.body.product);
                });
                if (index != -1) {
                    cart.items[index].quantity += Number(req.body.quantity);
                    return cart.save()
                } else {
                    cart.items.push({product: req.body.product, quantity: Number(req.body.quantity)});
                    return cart.save();
                }
                
            }, function (error){
                res.send("Unable to find cart"); // May want to change this to create a cart instead? 
            })
            .then(function(cart){
                res.status(201).send(cart);
            })
            .then(null, next);
        }
    else {
        //If req.session.items doesn't exist, create an empty array
        if(!("items" in req.session)) {
            req.session.items=[];
        } 
        var index = _.findIndex(req.session.items,{product: req.body.product})

        if(index != -1) req.session.items[index].quantity += Number(req.body.quantity);
        else req.session.items.push({product: req.body.product, quantity: Number(req.body.quantity)});
        res.json(req.session.items);
    }

})

//Create cart
router.post('/', function(req, res, next){
    //Cart.create(req.body)
    var cart = new Cart(req.body);


    console.log("GOT IN HERE", cart)
    cart.save()
    .then(function(cart){
        res.status(201).send(cart);
    })
    .then(null, next);
})

// Modify cart
//*** NOT REQUIRED ***
// router.put('/:id', function(req, res, next){
//     Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(function(cart){
//             res.send(cart);
//         })
//         .then(null, next);
// })

// Delete cart 
//*** NOT REQUIRED ***
// router.delete('/:id', function(req, res, next){
//     Cart.findByIdAndRemove(req.params.id)
//         .then(function(cart){
//             res.status(204).send(cart);
//         })
//         .then(null, next);
// })



// From shopping cart
// Update quantity of existing item
// req.body { product: "23XSF43VREG", quantity: 2}
router.put('/item/:productId', function(req, res, next){
    if(req.user) {
        Cart.findById(req.user.active_cart)
            .then(function(cart){
                var index =  _.findIndex(cart.items, function(item) {
                    return item.product.equals(req.params.productId);
                });
                if (index === -1) {
                    throw new Error("Item does not exist.");
                    next();
                } else {
                    cart.items[index].quantity = Number(req.body.quantity);
                    return cart.save();
                }
            })
            .then(function(cart){
                res.send(cart);
            })
            .then(null, next);
    }
    else {
        var index = _.findIndex(req.session.items,{product: req.body.product})
        if(index == -1) {
            throw new Error("Item does not exist.");
            next();
        }
        else {
            req.session.items[index].quantity = Number(req.body.quantity);
            res.json(req.session.items)
        }
    }
})

// Delete specific item from cart items
// This might need to turn into a PUT request, because you want to send back an updated view of the cart
router.delete('/item/:productId', function(req, res, next){
    if(req.user) {
    Cart.findById(req.user.active_cart)
        .then(function(cart){
            var index =  _.findIndex(cart.items, function(item) {
                return item.product.equals(req.params.productId);
            });
            cart.items.splice(index, 1);
            return cart.save({new: true})
        })
        .then(function(cart){
            res.status(204).send("Successfully deleted")
        })
        .then(null, next);
    }
    else {
        var index = _.findIndex(req.session.items,{product: req.params.productId})
        if(index == -1) {
            throw new Error("Item does not exist.");
            next();
        }
        else {
            req.session.items.splice(index,1);
            res.json(req.session.items)
        }
    }
})


// checkout
// Expect req.body = {shipping_address: "123 main st"}
router.put('/:id/checkout/', function(req, res, next){
    var new_cart;
    var inv_not_enough = [];
    var valid = true;
    Cart.findById(req.params.id)
        .populate('items.product').exec()
        .then(function(cart){
            if (cart.status!=="active") res.status(400).send("Cart already checked-out!")
            cart.items.forEach(function(item){
                //Check if product quantity is less than inventory
                if(item.quantity>item.product.inventory){
                    valid = false;
                    inv_not_enough.push(item.product)
                }
            })
            //If parts of order doesn't have enough inventory, then cancel entire checkout process
            if(valid === false) res.status(400).send(inv_not_enough)

            cart.items.forEach(function(item){
                //Copy price from product model to shopping cart
                item.unit_price_paid = item.product.unit_price;

                //Subtract quantity from inventory
                Product.updateInventory(item.product._id,(item.product.inventory-item.quantity));
                
            })

            cart.status = "ordered";
            cart.shipping_address = req.body.shipping_address;
            cart.checkout_date = Date.now();
            // for product in cart.items, populate, and store product.unit_price in unit_price_paid
            
            return cart.save();
        })
        .then(function(cart){
           if(req.user) return Cart.create({ user_id: cart.user_id, status: "active" })
            else res.send("Successfully checked out for guest");
        })
        .then(function(newCart){
           new_cart = newCart;
           return User.findById(newCart.user_id)
        })
        .then(function(user){
            user.active_cart = new_cart._id;
            return user.save();
        })
        .then(function(user){
            res.send("Successfully checked out");
        })
        .then(null, next);
})
