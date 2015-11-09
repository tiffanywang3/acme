'use strict';
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    product_id: String,
    items: {}
});


module.exports = mongoose.model('Recommendation', schema);
