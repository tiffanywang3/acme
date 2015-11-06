// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Cart = mongoose.model('Cart');
var Address = mongoose.model('Address')

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/fsg-app';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Carts Route', function () {
	var productId;
	var productObj;
    var userId;
    var createdUser;
    var cartId;

	beforeEach('Establish DB connection ', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach('Populate product and user', function (done) {
        User.create({ email: 'obama@gmail.com', password: 'potus' })
        .then(function(user){
            createdUser = user;
            userId = user._id;
            return Product.create({product_name: "acmeTestProduct", category: "food", show_name: "Adventure Time", description: "Hi Phil", inventory: 5, unit_price: 50})
        })
        .then(function(product){
            productId = product._id;
            productObj = product;
            return Cart.create([{user_id: userId, status: "active", items: [{product: productId, quantity: 2}]}, {user_id: userId, status: "ordered", items: [{product: productId, quantity: 1}]}, {user_id: userId, status: "shipped", items: [{product: productId, quantity: 3}]}])
        })
        .then(function(carts) {
        	cartId=carts[0]._id
        	done();
        })
    });


	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Should properly route cart requests', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});


		it('should get all carts', function (done) {
			guestAgent.get('/api/carts/')
				.expect(200)
				.end(function(err,response) {
					expect(response.body).to.be.instanceOf(Array)
					expect(response.body).to.have.length(3)
					done();
				})
				
		});
		it('gets a single cart', function (done) {
			guestAgent.get('/api/carts/'+cartId)
				.expect(200)
				.end(function(err,response) {
					expect(response.body._id).to.equal(String(cartId));
					done();
				})
		});
		it('creates a single cart', function (done) {
			guestAgent.post('/api/carts/')
				.send({user_id: userId, status: "active", items: [{product: productId, quantity: 5}]})
				.expect(201)
				.end(function(err,response) {
					expect(response.body.items[0].quantity).to.equal(5);
					expect(response.body.status).to.equal("active");
					done();
				})
		});

		it('updates a single cart', function (done) {
			guestAgent.put('/api/carts/'+cartId)
				.send({ items: [{product: productId, quantity: 6}]})
				.expect(200)
				.end(function(err,response) {
					expect(response.body.items[0].quantity).to.equal(6);
					expect(response.body.status).to.equal("active");
					done();
				})
		});

		it('deletes a single cart', function (done) {
			guestAgent.delete('/api/carts/'+cartId)
				.expect(204)
				.end(done);
		});

		it('adds item to cart that exists already', function (done) {
			guestAgent.post('/api/carts/'+cartId)
				.send({product: productId, quantity: 7})
				.expect(201)
				.end(function(err,response) {
					expect(response.body.items[0].quantity).to.equal(9);
					expect(response.body.status).to.equal("active");
					done();
				})
		});

		it('adds item to cart that doesnt exist in cart', function (done) {
			Product.create({product_name: "another product", category: "food", show_name: "Adventure Time", description: "Hi Tiffany", inventory: 10, unit_price: 99})
			.then(function(product) {
					guestAgent.post('/api/carts/'+cartId)
					.send({product: product._id, quantity: 1})
					.expect(201)
					.end(function(err,response) {
						expect(response.body.items[1].quantity).to.equal(1);
						expect(response.body.status).to.equal("active");
						expect(response.body.items[1].product).to.equal(String(product._id))
						done();
					})
			})
			
		});

		it('modify existing item from shopping cart', function (done) {
			guestAgent.put('/api/carts/'+cartId+'/item/'+productId)
				.send({product: productId, quantity: 7})
				.expect(200)
				.end(function(err,response) {
					expect(response.body.items[0].quantity).to.equal(7);
					expect(response.body.status).to.equal("active");
					done();
				})
		});

		it('delete existing item from shopping cart', function (done) {
			guestAgent.delete('/api/carts/'+cartId+'/'+productId)
				.expect(204)
				.end(done)
		});

		it('checking out a shopping cart successfully', function (done) {
			 var createAddress = function (){
                return Address.create({
                    number: 5,
                    street: "Hanover Square",
                    city: "New York",
                    state: "NY",
                    country: "US",
                    zipcode: "11234"
                })
           }


           createAddress().then(function(address){
           	guestAgent.put('/api/carts/'+cartId+'/checkout')
				.send({shipping_address: address._id})
				.expect(200)
				.end(function(err,response) {
					expect(response.text).to.equal("Successfully checked out");
					done();
				})
           }, function (error){
           	console.log("address couldn't be created")
           })
			

		});

	});


});


































