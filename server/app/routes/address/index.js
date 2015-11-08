'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var Address = require('../../../db/models/address.js')


router.get('/:address_id', function(req, res, next){

	Address.findById(req.params.Address_id)
	.then(function(Address){
		console.log("THIS IS FROM THE Address ROUTE", req.params.Address_id)
		//req.requestedAddress = Address ????
		res.send(Address);
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})

//get all Address (for debugging)
router.get('/', function(req, res, next){
	Address.find()
	.then(function(Addresss){
		res.send(Addresss)
	})
	.then(null, function(err){
		err.status = 400;
		next(err);
	})
})


//create Address (post)
router.post('/', function(req,res,next){
	Address.create(req.body)
	.then(function(Address){
		res.status(201).send(Address)
	})
	.then(null, function(err){
		err.status = 400;
		next(err);
	})
})




//update an Address
router.put('/:address_id', function(req, res, next){
	Address.findByIdAndUpdate(req.params.Address_id, req.body, {new:true})
	.then(function(Address){
		res.send(Address);
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












