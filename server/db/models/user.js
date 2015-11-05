'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Cart = require('./cart');
var Address = require('./address')
var validate = require('mongoose-validate')

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validate.email, 'invalid email address']
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    shipping_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
    billing_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    phone_number: {
        type: String
    },
    active_cart: {
        type: mongoose.Schema.Types.ObjectId, ref:'Cart'
    }

});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

//need to decide format that carts will come back in. Array?
schema.method('retrieveHistory', function(){
    return Cart.getHistory(this);

})
schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

module.exports = mongoose.model('User', schema);























