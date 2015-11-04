var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var User = mongoose.model('User');

describe('User model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(User).to.be.a('function');
    });

        describe('create user with valid email', function () {

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            it('should create a valid user', function (done) {
                createUser().then(function (user) {
                    expect(user.email).to.be.ok;
                    done();
                });
            });

        });



        describe('fail to create user with invalid email', function () {

            it('should error with empty email address', function (done) {
                var createUser = function () {
	                return User.create({password: 'potus' });
	            };	
            	createUser().then(function (user) {
                    expect(user).to.be.null;
                    done();
                })
                .then(null, function(err){
                	expect(err).to.be.ok;
                	done();
                })
            });

            

            it('should error with duplicate email address', function () {
                var createUser1 = function () {
	                return User.create({ email: 'obama@gmail.com', password: 'potus' });
	            };
	            var createUser2 = function () {
	                return User.create({ email: 'obama@gmail.com', password: 'potus' });
	            };
                // @OB/NE also feel free to check out chai-as-promised
            	return createUser1().then(function (user) {
                    expect(user).to.be.ok;
                    return createUser2()
                })
                .then(function(user){
                	expect(user).to.be.null;
                })
                .then(null, function(err){
                	expect(err).to.be.ok;
                })


            });


            it('should error with incomplete email address', function (done) {
                var createUser = function () {
	                return User.create({email: 'obama', password: 'potus' });
	            };	
            	createUser().then(function (user) {
                    expect(user).to.be.null;
                    done();
                })
                .then(null, function(err){
                	expect(err).to.be.ok;
                	done();
                })
            });

        });



});


































