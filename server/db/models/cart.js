'use strict';
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number },
        unit_price: { type: Number }
        }],
    status: { type: String, enum: {
         values: ["active", "ordered", "shipped", "delivered"],
         message: "Invalid value for status."
    } },
    checkout_date: { type: Date }
});


schema.statics.getCartHistory = function(user) {
    return this.find({ user_id: user._id, status: {$ne: "active"} });
}

module.exports = mongoose.model('Cart', schema);
