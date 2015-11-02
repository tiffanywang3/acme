'use strict';
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
   text: String,
   rating: { type: Number, min: 1, max: 5, required: true },
   date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', schema);
