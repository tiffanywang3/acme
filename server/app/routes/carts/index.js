'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose')

var Cart = require('../../../db/models/cart');
var User = require('../../../db/models/user');

// Get all carts
router.get('/', function(req, res, next){
    Cart.find()
        .then(function(carts){
            res.send(carts);
        })
        .then(null, next);
})

// Get one cart by ID
router.get('/:id', function(req, res, next){
    Cart.findById(req.params.id)
        .populate('items.product').exec()
        .then(function(cart){
            res.send(cart);
        })
        .then(null, next);
})

// Create cart
router.post('/', function(req, res, next){
    Cart.create(req.body)
        .then(function(cart){
            res.status(201).send(cart);
        })
        .then(null, next);
})

// Modify cart
router.put('/:id', function(req, res, next){
    Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function(cart){
            res.send(cart);
        })
        .then(null, next);
})

// Delete cart
router.delete('/:id', function(req, res, next){
    Cart.findByIdAndRemove(req.params.id)
        .then(function(cart){
            res.status(204).send(cart);
        })
        .then(null, next);
})

// From product page
// Add item to items list
// req.body { product: "23XSF43VREG", quantity: 2}
router.post('/:id', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            // console.log("CART BEFORE LOGIC",cart)
            var index =  _.findIndex(cart.items, function(item) {
                return item.product.equals(req.body.product);
            });
            // console.log("INDEX", index)
            if (index != -1) {
                cart.items[index].quantity += req.body.quantity;
                return cart.save()
            } else {
                cart.items.push(req.body);
                return cart.save();
            }
            
        })
        .then(function(cart){
            // console.log("CART AFTER LOGIC", cart)
            res.status(201).send(cart);
        })
        .then(null, next);
})

// From shopping cart
// Update quantity of existing item
// req.body { product: "23XSF43VREG", quantity: 2}
router.put('/:id/item', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            var index =  _.findIndex(cart.items, function(item) {
                return item.product.equals(req.body.product);
            });
            // console.log("INDEX", index)
            if (index === -1) {
                throw new Error("Item does not exist.");
                next();
            } else {
                // console.log("GOT IN HERE AND HERES CART", cart.items)
                cart.items[index].quantity = req.body.quantity;
                return cart.save();
            }
        })
        .then(function(cart){
            // console.log("RESPONSE CART", cart)
            res.send(cart);
        })
        .then(null, next);
})

// Delete specific item from cart items
// This might need to turn into a PUT request, because you want to send back an updated view of the cart
router.delete('/:id/:productId', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            var index =  _.findIndex(cart.items, function(item) {
                return item.product.equals(req.params.productId);
            });
            // console.log("BEFORE SLICE", cart.items)
            cart.items.splice(index, 1);
            // console.log("AFTER SLICE", cart.items)
            return cart.save({new: true})
        })
        .then(function(cart){
            // console.log("RESPONSE CART ITEMS", cart)
            res.status(204).send("Successfully deleted")
        })
        .then(null, next);
})


// checkout
// Expect req.body = {shipping_address: "123 main st"}
router.put('/checkout/:id', function(req, res, next){
    var new_cart;
    Cart.findById(req.params.id)
        .populate('items.product').exec()
        .then(function(cart){
            cart.status = "ordered";
            cart.shipping_address = req.body.shipping_address;
            cart.checkout_date = Date.now();
            // for product in cart.items, populate, and store product.unitPrice in unit_price_paid
            cart.items.forEach(function(item){
                item.unit_price_paid = item.product.unitPrice;
            })
            return cart.save();
        })
        .then(function(cart){
           return Cart.create({ user_id: cart.user_id, status: "active" })
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
