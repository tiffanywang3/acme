var dbURI = 'mongodb://localhost:27017/fsg-app';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

describe('Cart model', function () {
    var productId;
    var userId;
    var createdUser;
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });
    beforeEach('Populate product and user', function (done) {
        User.create({ email: 'obama@gmail.com', password: 'potus' })
        .then(function(user){
            createdUser = user;
            userId = user._id;
            return Product.create({product_name: "acmeTestProduct", category: "food", show_name: "Adventure Time", description: "Hi Phil", inventory: 5, unitPrice: 50})
        })
        .then(function(product){
            productId = product._id;
            done();
        })
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Cart).to.be.a('function');
    });

        describe('Should create a new cart as guest', function () {

            var createCart = function () {

                return Cart.create({guest_id: "Hello Phil", status: "active", items: [{product: productId, quantity: 2}]});
            };

            it('should create a valid cart', function (done) {
                createCart().then(function (cart) {
                    expect(cart.status).to.equal('active');
                    expect(cart.items).to.have.length(1);
                    expect(cart.items[0].product).to.equal(productId);
                    expect(cart.items[0].quantity).to.be.ok;
                    done();
                });
            });

        });

        describe('Should create a new cart as user', function () {

            var createCart = function () {

                return Cart.create({user_id: userId, status: "active", items: [{product: productId, quantity: 2}]});
            };

            it('should create a valid cart', function (done) {
                createCart().then(function (cart) {
                    expect(cart.status).to.equal('active');
                    expect(cart.items).to.have.length(1);
                    expect(cart.items[0].product).to.equal(productId);
                    expect(cart.items[0].quantity).to.be.ok;
                    done();
                });
            });

        });

        describe('Should not create a new cart without user_id or guest_id', function () {

            var createCart = function () {

                return Cart.create({status: "active", items: [{product: productId, quantity: 2}]});
            };

            it('should create a valid cart', function (done) {
                createCart().then(function (cart) {
                    expect(cart).to.be.null;
                    done();
                })
                .then(null, done);
            });

        });


        describe('getCartHistory should get all carts whose status !== active', function (){
            it('should get 2 carts with non-active status', function () {
                 return Cart.create([{user_id: userId, status: "active", items: [{product: productId, quantity: 2}]}, {user_id: userId, status: "ordered", items: [{product: productId, quantity: 1}]}, {user_id: userId, status: "shipped", items: [{product: productId, quantity: 3}]}])
                 .then(function(carts){
                    return Cart.getCartHistory(createdUser)                
                    })
                .then(function (carts) {
                    expect(carts).to.be.instanceOf(Array);
                    expect(carts).to.have.length(2);
                })
                
                
            });

        });


});


































