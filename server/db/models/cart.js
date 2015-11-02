'use strict';
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number },
        unit_price: { type: Number }
        }],
    status: { type: String }
});

module.exports = mongoose.model('Cart', schema);
