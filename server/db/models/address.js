'use strict';
var mongoose = require('mongoose')
var validate = require('mongoose-validate')

var schema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    number: Number,
    street: String,
   	city: String,
   	state: String,
   	country: String,
   	zipcode: {type: String, maxlength: 5}
});


module.exports = mongoose.model('Address', schema);























