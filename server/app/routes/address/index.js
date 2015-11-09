'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Address = require('../../../db/models/address.js')

//update an Address
router.put('/:address_id', function(req, res, next){
	console.log("req.params.address_id",req.params.address_id)
	Address.findByIdAndUpdate(req.params.address_id, req.body, {new:true})
	.then(function(address){
		console.log("THIS IS THE UPDATED ADDRESS", address)
		res.send(address);
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})

//find one address
router.get('/:address_id', function(req, res, next){
	//console.log("req.params.address_id",req.params.address_id)
	Address.findById(req.params.address_id)
	.then(function(address){
		console.log("THIS IS THE UPDATED ADDRESS", address)
		res.send(address);
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})



router.delete('/:address_id', function(req, res, next){
	Address.findByIdAndRemove(req.params.Address_id)
	.then(function(){
		res.status(204).end();
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})












