'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');


router.get("/", function (req, res, next){
	Products.find()
	.then (function (allProducts){
		res.send(allProducts)
	})
	.then (null, next)
})

router.get("/:productId", function (req, res, next){
	Products.findById(req.params.productId)
	.then (function (allProducts){
		res.send(allProducts)
	}, function(err){
		res.status(404).send("Product doesn't exist");
	})
	.then (null, next)
})


router.get("/types/:type", function (req, res, next){
	Products.find({type: req.params.type})
	.then (function (foundProducts){
		res.send(foundProducts)
	}})
	.then (null, next)
})

router.get("/shows/:show_name", function (req, res, next){
	Products.find({show_name: req.params.show_name})
	.then (function (foundProducts){
		res.send(foundProducts)
	})
	.then (null, next)
})

/*
- Get ones under x price
- Get only ones that have items in stock
- If we have a lot of clothes, get by male/female

*/

