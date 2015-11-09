'use strict';
var mongoose = require('mongoose')
var validate = require('mongoose-validate')

var schema = new mongoose.Schema({
	// @OB/NE are all addresses associated with a user?
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    number: Number,
    street: String,
   	city: String,
   	state: String,
   	country: String,
   	zipcode: {type: String, maxlength: 5}
});
// @OB/NE validations?
// @OB/NE maybe this should be a schema only


module.exports = mongoose.model('Address', schema);























