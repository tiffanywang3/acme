// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);

describe('Product route', function() {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('Product request', function () {

        beforeEach('Create products', function (done) {
            Product.create({
                    product_name: "The Name",
                    category: ["food"],
                    show_name: "The Simpsons",
                    description: "It's good",
                    imageUrl: "/images/whatever.jpg",
                    inventory: 5,
                    unitPrice: 99.99
                },
                {product_name: "Another One",
                    category: ["clothes"],
                    show_name: "The Simpsons",
                    description: "It's great",
                    imageUrl: "/images/whatever.jpg",
                    inventory: 5,
                    unitPrice: 5.60
                },
                {product_name: "Third Thing",
                    category: ["clothes", "food"],
                    show_name: "The Simpsons",
                    description: "It's great",
                    imageUrl: "/images/whatever.jpg",
                    inventory: 5,
                    unitPrice: 5.60
                },
                done)
        });

        it('GET ALL should get with 200 response and with an array as the body', function (done) {
            agent.get('/api/products/')
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(3);
                    done();
                })
        });

        it('GET BY CATEGORY should get with 200 response and with an array as the body', function (done) {
            agent.get('/api/products/categories/food')
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(2);
                    done();
                })
        });


        it('GET BY SHOW_NAME', function (done) {
            agent.get('/api/products/shows/The%20Simpsons')
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(3);
                    done();
                })
        });

        it('search for show_name', function (done) {
            agent.get('/api/products/search/')
                .query({ show_name: "Simpsons" })
                .expect(200)
                .end(function(err, response){
                   // console.log("respnonse,", response);
                   // console.log("ERR in test", err);
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(3);
                    done();
                })
        });

        it('search for show_name with space', function (done) {
            agent.get('/api/products/search/')
                .query({ show_name: "The Simpsons" })
                .expect(200)
                .end(function(err, response){
                    // console.log("respnonse,", response);
                    // console.log("ERR in test", err);
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(3);
                    done();
                })
        });

        it('search for category', function (done) {
            agent.get('/api/products/search/')
                .query({ category: "food" })
                .expect(200)
                .end(function(err, response){
                    // console.log("respnonse,", response);
                    // console.log("ERR in test", err);
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(2);
                    done();
                })
        });

        it('search for anything', function (done) {
            agent.get('/api/products/search/')
                .query({ any: "great" })
                .expect(200)
                .end(function(err, response){
                    // console.log("respnonse,", response);
                    // console.log("ERR in test", err);
                    if(err) return done(err);
                    expect(response.body).to.be.instanceof(Array);
                    expect(response.body).to.have.length(2);
                    done();
                })
        });

    });

})
