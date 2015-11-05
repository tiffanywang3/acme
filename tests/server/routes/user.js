// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/fsg-app';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Find user', function () {

		var guestAgent;
		var userId;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});
		beforeEach('Create user in database', function (done) {
			User.create({ email: 'obama@gmail.com', password: 'potus' })
			.then(function(user){
				userId = user._id;
				done();
			})
		});

		it('should find a user', function (done) {
			guestAgent.get('/api/users/' + userId)
				.expect(200)
				.end(done);
		});
		it('should not find a user that doesnt exist', function (done) {
			guestAgent.get('/api/users/helloPhil')
				.expect(404)
				.end(done);
		});

	});

	describe('Update user', function () {

		var guestAgent;
		var userId;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});
		beforeEach('Create user in database', function (done) {
			User.create({ email: 'obama@gmail.com', password: 'potus' })
			.then(function(user){
				userId = user._id;
				done();
			})
		});

		it('should update a user', function (done) {
			guestAgent.put('/api/users/' + userId)
				.send({first_name: "Phil"})
				.expect(200)
				.end(function(err, response){
					//console.log(response.body)
					expect(response.body.first_name).to.equal("Phil")
					done();
				})

		});
		it('should not update a user that doesnt exist', function (done) {
			guestAgent.put('/api/users/helloPhil', {first_name: "Phil"})
				.expect(404)
				.end(done);
		});

	});

	describe('Delete user', function () {

		var guestAgent;
		var userId;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});
		beforeEach('Create user in database', function (done) {
			User.create({ email: 'obama@gmail.com', password: 'potus' })
			.then(function(user){
				userId = user._id;
				done();
			})
		});

		it('should delete a user', function (done) {
			guestAgent.delete('/api/users/' + userId)
				.expect(204)
				.end(done);

		});
		it('should not delete a user that doesnt exist', function (done) {
			guestAgent.delete('/api/users/helloPhil')
				.expect(404)
				.end(done);
		});

	});

	describe('Create new user', function () {

		var guestAgent;
		var userId;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should create a user', function (done) {
			guestAgent.post('/api/users/')
				.send({ email: 'obama@gmail.com', password: 'potus' })
				.expect(201)
				.end(done);

		});

	});
	describe('Get all users', function () {

		var guestAgent;
		var userId;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get all users', function (done) {
			guestAgent.get('/api/users/')
				.expect(200)
				.end(function(err, response){
					//console.log(response.body)
					expect(response.body).to.be.instanceOf(Array)
					done();
				})

		});

	});

});


































