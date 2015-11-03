'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Cart = require('../../../db/models/cart');

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
// req.body { product: "23XSF43VREG", quantity: 2, unit_price: 5}
router.post('/:id', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            var index =  _.find(cart.items, { 'product': req.body.product });
            if (index != -1) {
                cart.items[index].quantity += req.body.quantity;
                return cart.save()
            } else {
                return cart.update({ $push: { "items": req.body} }, {new: true})
            }
        })
        .then(function(cart){
            res.status(201).send(cart);
        })
        .then(null, next);
})

// From shopping cart
// Update quantity of existing item
router.put('/:id/item', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            var index =  _.find(cart.items, { 'product': req.body.product });
            if (index != -1) {
                throw new Error("Item does not exist.");
                next();
            } else {
                cart.items[index] = req.body;
                return cart.save();
            }
        })
        .then(function(cart){
            res.send(cart);
        })
        .then(null, next);
})

// Delete specific item from cart items
router.delete('/:id/:productId', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            var index =  _.find(cart.items, { 'product': req.params.productId });
            cart.items.slice(index, 1);
            return cart.save({new: true})
        })
        .then(function(cart){
            res.status(204).send(cart)
        })
        .then(null, next);
})


// TODO make checkout function
router.get('/checkout/:id', function(req, res, next){
    res.send(200)
})
