var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

describe('Review model', function() {

	var user, product;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    // afterEach('Clear test database', function (done) {
    //     clearDB(done);
    // });

    var userId, productId;

    var user = User.create({email: "bob@bob.com"})
    			.then (function (_user_){
    				userId = _user_._id;
    			})
    			
    var product = Product.create({
                product_name: "The Name",
                category: ["food"],
                show_name: "The Simpsons",
                description: "It's great",
                imageUrl: "/images/whatever.jpg",
                inventory: 5,
                unitPrice: 99.99
				})
				.then (function (_product_){
						productId = _product_._id;
				})
				


    it('should exist', function () {
        expect(Review).to.be.a('function');
    });


    it('can be created with all fields', function(done){
            Review.create({
                user_id: userId,
                product_id: productId,
                text: "This is a winning review, you bet",
                rating: 4
            })
                .then(function(review){
                    expect(review.text).to.be.equal("This is a winning review, you bet");
                    expect(review.rating).to.be.equal(4);
                    expect(review.date).to.exist;
                    expect(review.date).to.be.a('Date');
                    done();
                }, function (err){
                	console.log("failed:", err);
                	done();
                })
    })

    it('can only be created with a rating between 1 and 5', function(done){
            Review.create({
                user_id: userId,
                product_id: productId,
                text: "This is a winning review, you bet. WOOOOOOOOOOOOO",
                rating: 10
            })
                .then(function(review){
                    done();
                }, function (err){
                	expect(err.message).to.contain("Review validation failed");
                	done();
                })
    })

    it('can only be created with a review between 50 and 250 characters', function(done){
            Review.create({
                user_id: userId,
                product_id: productId,
                text: "Winning",
                rating: 4
            })
                 .then(function(review){
                    done();
                }, function (err){
                	expect(err.message).to.contain("Review validation failed");
                	done();
                })
    })


})
