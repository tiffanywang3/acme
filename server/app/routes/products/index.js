'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');

var Product = require ("../../../db/models/product.js");

// @OB/NE use case?
router.get("/search/", function (req, res, next){
    // NEED TO TEST THAT THE REGEX WORKS
    // @OB/NE maybe this should be a model static? also look into $regex operator
    var query = {};
    if (req.query.name) {
        var name_reg = new RegExp(".*" + req.query.name + ".*", "i")
        query.name = name_reg;
    }
    else if (req.query.show_name){
        var show_name_reg = new RegExp(".*" + req.query.show_name + ".*", "i")
        query.show_name = show_name_reg;
    }
    else if (req.query.category){ // a product can have more than on category, use $in
        var category_reg = new RegExp(".*" + req.query.category + ".*", "i")
        query.category = {$in: [ category_reg ]}
    }
    //else if (req.query.productId){
    //    var productId_reg = new RegExp(".*" + req.query.productId + ".*", "i")
    //    query._id = productId_reg;
    //}
    else {
        var any_reg = new RegExp(".*" + req.query.any + ".*", "i")
        query = {$or: [{name: any_reg}, {show_name: any_reg}, {category: any_reg}, {description: any_reg}]};
    }

    Product.find(query)
        .then (function (foundProducts){
        res.send(foundProducts)
    })
        .then (null, next)
})

router.get("/", function (req, res, next){
	Product.find()
	.then (function (allProducts){
		res.send(allProducts)
	})
	.then (null, next)
})

router.get("/:productId", function (req, res, next){
	Product.findById(req.params.productId)
	.then (function (allProducts){ // @OB/NE this is one product
		res.send(allProducts)
	}, function(err){
		res.status(404).send("Product doesn't exist");
	})
	.then (null, next)
})

// @OB/NE maybe use req.query instead, and merge this logic into the GET / above
router.get("/categories/:category", function (req, res, next){
	Product.find({category: req.params.category})
	.then (function (foundProducts){
		res.send(foundProducts)
	})
	.then (null, next)
})

// @OB/NE what's this about? could be bundled into GET / using req.query instead
router.get("/shows/:show_name", function (req, res, next){
    req.params.show_name.replace("%20", " ");
	Product.find({show_name: req.params.show_name})
	.then (function (foundProducts){
		res.send(foundProducts)
	})
	.then (null, next)
})


// @OB/NE no delete/put/posts? haven't gotten there yet?


/*
- Get ones under x price
- Get only ones that have items in stock
- If we have a lot of clothes, get by male/female

*/

