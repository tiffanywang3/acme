'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var User = require('../../../db/models/user.js')


router.get('/:user_id', function(req, res, next){
	User.findById(req.params.user_id)
	.then(function(user){
		//req.requestedUser = user ????
		res.send(user);
	}, function(err){
		res.status(404).next();
	})
	.then(null, next);
})

router.put('/:user_id', function(req, res, next){
	User.findByIdAndUpdate(req.params.user_id, req.body)
	.then(function(user){
		res.send(user);
	}, function(err){
		res.status(404).next();
	})
	.then(null, next);
})

router.delete('/:user_id', function(req, res, next){
	User.findByIdAndRemove(req.params.user_id)
	.then(function(){
		res.status(204).end();
	}, function(err){
		res.status(404).end();
	})
	.then(null, next);
})












