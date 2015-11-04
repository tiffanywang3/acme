// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');


var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('Reviews route', function() {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    var userId, productId, reviewId;
	

    describe('Review request', function () {


        beforeEach('Create reviews', function (done) {

        	var user = User.create({
    	        email: "bob@bob.com"
    	    })
    	    .then(function(_user_) {
    	        userId = _user_._id;
    	        return Product.create({
    	            product_name: "The Name",
    	            category: ["food"],
    	            show_name: "The Simpsons",
    	            description: "It's great",
    	            imageUrl: "/images/whatever.jpg",
    	            inventory: 5,
    	            unitPrice: 99.99
    	        })
    	    })
    	    .then(function(_product_) {
    	        productId = _product_._id;
    	        return Review.create({
    	            user_id: userId,
    	            product_id: productId,
    	            text: "This is a winning review, you bet",
    	            rating: 4
    	        }, {
    	            user_id: userId,
    	            product_id: productId,
    	            text: "Here is another fantastico review for you to read",
    	            rating: 2
    	        })
    	    })
    	    .then(function(reviews) {
    	        //console.log("created ", reviews)
    	        reviewId=reviews._id;
    	        done();
    	    }, function(err) {
    	        console.log("errror1!! ", err)
    	    })
        });

		 afterEach('Clear test database', function (done) {
		        clearDB(done);
		  });

        it('GET ALL should get with 200 response and with an array as the body ', function (done) {
            agent.get('/api/reviews/')
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(2);
                    done();
                })
        })

        it('GETS a specific review by product id ', function (done) {
            agent.get('/api/reviews/product/' + productId)
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(2);
                    done();
                })
        })

        it('POSTS a specific review ', function (done) {
        	var newReview = {
        		user_id: userId,
	            product_id: productId,
	            text: "One two three four five six seven eight nine ten",
	            rating: 3
        	}
            agent.post('/api/reviews')
                .send(newReview)
                .expect(201)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body.text).to.equal("One two three four five six seven eight nine ten");
                    done();
                })
        })

        it('PUT a specific review ', function (done) {
        	var newReview = {
	            text: "One two three four five six seven eight nine ten"
        	}
        	
	            agent.put('/api/reviews/' + reviewId)
	                .send(newReview)
	                .expect(200)
	                .end(function(err, response){
	                    if(err) return done(err);
	                    expect(response.body._id).to.equal(reviewId.toString());
	                    expect(response.body.text).to.equal("One two three four five six seven eight nine ten");
	                    done();
	                })
            
        })

        it('DELETE a specific review ', function (done) {
	            agent.delete('/api/reviews/' + reviewId)
	                .expect(204)
	                .end(function(err, response){
	                    if(err) return done(err);
	                    Review.findById(reviewId)
	                    .then (function (review){
	                    	expect(review).to.equal(null);
	                    	done();
	                    }, function (err){
	                    	done();
	                    })
	                 
	                })
        })

    })
})