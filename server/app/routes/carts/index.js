'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Cart = require('../../../db/models/cart');

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
            res.send(cart);
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
            res.send(cart);
        })
        .then(null, next);
})


// TODO make checkout function
router.get('/checkout/:id', function(req, res, next){
    res.send(200)
})
