'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Recommendation = require('../db/models/recommendation.js');

router.get('/:productId', function(req, res, next){
    Recommendation.findOne({ product_id: req.params.productId})
        .then(function(productRec){
            var sortable = [];
            for (var key in productRec.items)
                  sortable.push([key, productRec.items[key]])
            sortable.sort(function(a, b) {return b[1] - a[1]})
            var three = sortable.slice(0, 3);
            var recIds = [];
            for(var i = 0; i < three.length; i++){
                recIds.push(three[i][0]);
            }
            res.send(recIds);


        })
})

router.put('/', function(req, res, next){
    req.body.items.forEach(function(itemId, idx){
        Recommendation.findOne({product_id: itemId})
        .then(function(rec){
            if(rec) {
                for(var i=0; i < req.body.items.length; i++){
                    if(rec.items[req.body.items[i]]){
                        rec.items[req.body.items[i]]++;

                    } else {
                        if(req.body.items[i] !== itemId){
                            rec.items[req.body.items[i]] = 1;
                        }
                        
                    }
                    
                }
                rec.markModified("items")
                rec.save()
                .then(function(rec2){
                    res.send("HERE IS THE RECOMMENDATION", rec2)
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
















