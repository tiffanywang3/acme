'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Review = require('../../../db/models/review');

router.get('/', function(req, res, next){
    Review.find()
        .then(function(reviews){
            res.send(reviews);
        }).then(null, next)
})

router.get('/product/:productId', function(req, res, next){
    Review.find({ product_id: req.params.productId })
        .populate("user_id")
        .exec()
        .then(function(reviews){
            res.send(reviews);
        }).then(null, next)
})

router.get('/user/:userId', function(req, res, next){
    Review.find({ user_id: req.params.userId })
        .populate("product_id")
        .then(function(reviews){
            res.send(reviews);
        }).then(null, next)
})

router.post('/', function(req, res, next){
    Review.create(req.body)
        .then(function(review){
            res.status(201).send(review);
        }).then(null, next)
})

router.put('/:id', function(req, res, next){
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function(review){
            res.send(review);
        }).then(null, next)
})

router.delete('/:id', function(req, res, next){
    Review.findByIdAndRemove(req.params.id)
        .then(function(review){
            res.status(204).send(review);
        }).then(null, next)
})
