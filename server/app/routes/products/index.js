'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Product = require ("../../db/models/products.js");

router.get("/", function (req, res, next){
	Product.find()
	.then (function (allProducts){
		res.send(allProducts)
	})
	.then (null, next)
})

router.get("/:productId", function (req, res, next){
	Product.findById(req.params.productId)
	.then (function (allProducts){
		res.send(allProducts)
	}, function(err){
		res.status(404).send("Product doesn't exist");
	})
	.then (null, next)
})


router.get("/categories/:category", function (req, res, next){
	Product.find({category: req.params.category})
	.then (function (foundProducts){
		res.send(foundProducts)
	}})
	.then (null, next)
})

router.get("/shows/:show_name", function (req, res, next){
	Product.find({show_name: req.params.show_name})
	.then (function (foundProducts){
		res.send(foundProducts)
	})
	.then (null, next)
})

router.get("/search/", function (req, res, next){
	// NEED TO TEST THAT THE REGEX WORKS
	
	var query = {};
	if (req.query == "name") {
		// ideally the object will look like {name: "/homer/"}
		query.name = "/" + req.query.name + "/"; 
	} 
	else if (req.query == "show_name"){
		query.show_name = "/" + req.query.show_name + "/";
	}
	else if (req.query == "category"){ // a product can have more than on category, use $in
		query.category = "{$in: [/" + req.query.category + "/]}";
	}
	else if (req.query == "productId"){
		query.productId = "/" + req.query.productId + "/";
	}
	// else {
	// 	// not sure what to do here
	// 	query = req.query;
	// }
 
 // Product.find({show_name: /Bob/})

	Product.find(query)
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

