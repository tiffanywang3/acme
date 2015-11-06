'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../../db/models/user.js')

router.post('/login', function(req, res, next){
	User.findOne(req.body)
	.then(function(user){
		req.login(user, function(err){
			if(err) next(err);
			else res.json(user);
		})
	})
	.then(null, next);
})


router.post('/signup', function(req, res, next){
	User.create(req.body)
	.then(function(user){
		req.login(user, function(err){
			if(err) next(err);
			else{
				Cart.create({user_id: user._id})
				.then(function(cart){
					res.status(201).json(user);
				})
			}
		})
		
	})
	.then(function(cart){
			
	})
	.then(null, next);
})

router.get('/logout', function(req, res, next){
	req.logout();
	res.end();
})















