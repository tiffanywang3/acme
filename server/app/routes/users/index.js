'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../../db/models/user.js')


router.get('/:user_id', function(req, res, next){

	User.findById(req.params.user_id)
	.then(function(user){
		console.log("THIS IS FROM THE USER ROUTE", req.params.user_id)
		//req.requestedUser = user ????
		res.send(user);
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})

//get all users (for debugging)
router.get('/', function(req, res, next){
	User.find()
	.then(function(users){
		res.send(users)
	})
	.then(null, function(err){
		err.status = 400;
		next(err);
	})
})

//get all carts for one user
router.get('/:user_id/carts', function(req, res, next){
	User.retrieveHistory(req.params.user_id)
	.then(function(carts){
		res.send(carts)
	})
	.then(null, function(err){
		err.status = 400;
		next(err);
	})
})


//create user (post)
router.post('/', function(req,res,next){
	User.create(req.body)
	.then(function(user){
		res.status(201).send(user)
	})
	.then(null, function(err){
		err.status = 400;
		next(err);
	})
})





router.put('/:user_id', function(req, res, next){

	User.findByIdAndUpdate(req.params.user_id, req.body, {new:true})
	.then(function(user){
		res.send(user);
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})

router.put('/:user_id/password', function(req,res,next) {
	User.findById(req.params.user_id)
	.then(function(user){
		user.password = req.body.password;
		user.dirtypassword = false;
		return user.save();
	})
	.then(function(updatedUser) {
		res.send(updatedUser)
	})
	.then(null, function(err){ 
		next(err);
	})
})
	


router.delete('/:user_id', function(req, res, next){
	User.findByIdAndRemove(req.params.user_id)
	.then(function(){
		res.status(204).end();
	})
	.then(null, function(err){
		err.status = 404;
		next(err);
	});
})












