'use strict';
var passport = require('passport');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Address = mongoose.model('Address');

module.exports = function (app) {

function mergeByProperty(arr1, arr2, prop) {
    _.each(arr2, function(arr2obj) {
        var arr1obj = _.find(arr1, function(arr1obj) {
            return arr1obj[prop] == arr2obj[prop];
        });         
        //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
        arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
    });
}

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

                //If guest user has items already in guest cart, then merge with user cart
                if("items" in req.session) {
                    Cart.findById(req.user.active_cart)
                    .then(function(cart) {
                        mergeByProperty(cart.items, req.session.items, "product");
                        delete req.session.items;
                        return cart.save()
                    })
                    .then(function(cart) {
                        res.status(200).send({
                        user: _.omit(user.toJSON(), ['password', 'salt'])
                        });
                    })
                }
                else {
                    res.status(200).send({
                    user: _.omit(user.toJSON(), ['password', 'salt'])
                    });
                }


                // We respond with a response object that has user with _id and email.
                
            });

        };

        passport.authenticate('local', authCb)(req, res, next);

    });
    app.post('/signup', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);
            if (!user) {
                User.create(req.body)
                .then(function(user){
                    req.logIn(user, function (loginErr) {
                        if (loginErr) return next(loginErr);
                        // We respond with a response object that has user with _id and email.
                        Address.create({user_id: user._id})
                        .then(function(address){
                            return User.findByIdAndUpdate(address.user_id, {shipping_address: address._id})
                        });


                        Cart.create({user_id: user._id, status: "active"})
                        .then(function(cart){
                            if("items" in req.session) {
                                mergeByProperty(cart.items, req.session.items, "product");
                                delete req.session.items;
                                return cart.save()
                                .then(function(){
                                    return User.findByIdAndUpdate(cart.user_id, {active_cart: cart._id})
                                })
                            }
                            return User.findByIdAndUpdate(cart.user_id, {active_cart: cart._id})
                            })
                        .then(function(user){
                            res.status(200).send({
                                user: _.omit(user.toJSON(), ['password', 'salt'])
                            });
                            }, function(err){
                            console.log("Cart not created")
                        });

                        
                    });
                    
                }, function(err){
                    res.status(404).send("Please enter a unique and valid email!")
                })
            }




            

        };

        passport.authenticate('local', authCb)(req, res, next);

    });

};



















