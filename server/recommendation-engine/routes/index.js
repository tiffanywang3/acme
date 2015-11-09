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
            for(var key in productRec){
                console.log("got in the for loop", productRec)
                if(!max.num){
                    console.log("if there was no max to begin with should be null", max)
                    max.id = key;
                    max.num = productRec[key];
                } else if(max.num < productRec[key]){
                    console.log("this should not be null", max)
                    max.id = key;
                    max.num = productRec[key]
                }

            }
            res.send(max)

        })
})

router.put('/', function(req, res, next){
    //  req.body.items is an array of product id's from a cart. req.body = {items: ["A", "B", "C"]}
    console.log("req.body", req.body);
    req.body.items.forEach(function(itemId, idx){
        console.log("got in first forEach");
        console.log("itemId", itemId);
        Recommendation.findOne({product_id: itemId})
        .then(function(rec){
            if(rec) {
                console.log("Here is rec", rec)
                for(var key in rec.items){
                    if(rec.items[key]){
                        rec.items[key]++;

                    } else {
                        rec.items[key] = 1;
                    }
                }
                rec.markModified("items")
                rec.save()
                .then(function(rec2){
                    console.log("should've been updated", rec2==rec)
                        res.send(rec2)
                }, function(err){
                    console.log("something went wrong")
                })
            }
            else{
                console.log("Are we overwriting something...")
                var otherProds = {};
                req.body.items.forEach(function (item) {
                    if (item != req.body.items[idx]) {
                        otherProds[item] = 1;
                    }
                })
                Recommendation.create({product_id: itemId, items: otherProds})
                    .then(function(rec){
                        console.log("newly created", rec)
                    });
            }
        }, console.log)

    })
    res.send("ello");
})
