'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Review = require('../../../db/models/review');

router.get('/', function(req, res, next){
    Review.find()
        .then(function(reviews){
            res.send(reviews);
        }) // @OB/NE error handling
})

// @OB/NE possibly switch to '/products/:id/reviews'
router.get('/product/:productId', function(req, res, next){
    Review.find({ product_id: req.params.productId })
        .then(function(reviews){
            res.send(reviews);
        }) // @OB/NE error handling
})

router.get('/user/:userId', function(req, res, next){
    Review.find({ user_id: req.params.userId })
        .then(function(reviews){
            res.send(reviews);
        }) // @OB/NE error handling
})

router.post('/', function(req, res, next){
    Review.create(req.body)
        .then(function(review){
            res.status(201).send(review);
        }) // @OB/NE error handling
})

router.put('/:id', function(req, res, next){
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }) // @OB/NE pre save hooks will not fire
        .then(function(review){
            res.send(review);
        }) // @OB/NE error handling
})

router.delete('/:id', function(req, res, next){
    Review.findByIdAndRemove(req.params.id)
        .then(function(review){
            res.status(204).send(review);
        }) // @OB/NE error handling
})
