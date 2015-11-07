'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');

module.exports = function (app) {

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({ email: email })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: _.omit(user.toJSON(), ['password', 'salt'])
                });
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });
    app.post('/signup', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);
            // if (!user) {
            //     User.create(req.body)
            //     .then(function(user){
            //         console.log("USER CREATED UPON SIGNUP", user)
            //         res.status(201).send(user);
            //     })
            // }
            if (!user) {
                User.create(req.body)
                .then(function(user){
                    req.logIn(user, function (loginErr) {
                        if (loginErr) return next(loginErr);
                        // We respond with a response object that has user with _id and email.
                        Cart.create({user_id: user._id, status: "active"})
                        .then(function(cart){
                            User.findByIdAndUpdate(cart.user_id, {active_cart: cart._id})
                            .then(function(user){
                                res.status(200).send({
                                    user: _.omit(user.toJSON(), ['password', 'salt'])
                                });
                            })
                            
                        }, function(err){
                            console.log("Cart not created")
                        })

                        
                    });
                    
                })
            }




            

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

};



















