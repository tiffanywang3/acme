'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Cart = require('../../../db/models/cart');
var User = require('../../../db/models/user');

router.get('/', function(req, res, next){
    Cart.find()
        .then(function(carts){
            res.send(carts);
        })
        .then(null, next);
})

router.get('/:id', function(req, res, next){
    Cart.findById(req.params.id)
        .then(function(cart){
            res.send(cart);
        })
        .then(null, next);
})

router.post('/', function(req, res, next){
    Cart.create(req.body)
        .then(function(cart){
            res.status(201).send(cart);
        })
        .then(null, next);
})

router.put('/:id', function(req, res, next){
    Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function(cart){
            res.send(cart);
        })
        .then(null, next);
})

router.delete('/:id', function(req, res, next){
    Cart.findByIdAndRemove(req.params.id)
        .then(function(cart){
            res.status(204).send(cart);
        })
        .then(null, next);
})


// checkout
router.put('/checkout/:id', function(req, res, next){
    var new_cart;
    Cart.findById(req.params.id)
        .then(function(cart){
            cart.status = "ordered";
            cart.shipping_address = req.body.shipping_address;
            cart.checkout_date = Date.now();
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
            res.send("Successfully checked out.");
        })
        .then(null, next);
})
