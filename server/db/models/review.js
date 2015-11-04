'use strict';
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
   product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
   text: { type: String, minlength: 10, maxlength: 250 },
   rating: { type: Number, min: 1, max: 5, required: true },
   date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', schema);
