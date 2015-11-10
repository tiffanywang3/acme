'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Recommendation = require('../db/models/recommendation.js');

router.get('/:productId', function(req, res, next){
    Recommendation.findOne({ product_id: req.params.productId})
        .then(function(productRec){

            var max = {
                id: null,
                num: null
            }
            for(var key in productRec.items){
                console.log("got in the for loop", productRec)
                if(!max.num){
                    console.log("if there was no max to begin with should be null", max)
                    max.id = key;
                    max.num = productRec[key];
                } else if(productRec[key] > max.num ){
                    console.log("this should not be null", max)
                    max.id = key;
                    max.num = productRec[key]
                }

            }
            res.send(max.id);

        })
})

router.put('/', function(req, res, next){
    console.log("WE ARE IN THE ROUTER.PUT");
    //  req.body.items is an array of product id's from a cart. req.body = {items: ["A", "B", "C"]}
    req.body.items.forEach(function(itemId, idx){
        Recommendation.findOne({product_id: itemId})
        .then(function(rec){
            if(rec) {
                console.log("Here is req.body.items", req.body.items)
                for(var i=0; i < req.body.items.length; i++){
                    if(rec.items[req.body.items[i]]){
                        rec.items[req.body.items[i]]++;

                    } else {
                        rec.items[req.body.items[i]] = 1;
                    }
                }
                rec.markModified("items")
                rec.save()
                .then(function(rec2){
                    res.send("HERE IS THE RECOMMENDATION", rec2)
                }, function(err){

                })
            }
            else{
                var otherProds = {};
                req.body.items.forEach(function (item) {
                    if (item != req.body.items[idx]) {
                        otherProds[item] = 1;
                    }
                })
                Recommendation.create({product_id: itemId, items: otherProds})
                    .then(function(rec){
                        console.log("newly created recommendation",rec)
                    });
            }
        }, console.log)

    })
    res.send("ello");
})
















