'use strict';
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    // @OB/NE change to just `user`
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    guest_id: String, // @OB/NE where do you get this id from?
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: { type: Number, required: true},
        unit_price_paid: { type: Number} // @OB/NE not required?
        }],
    status: { type: String, enum: {
         values: ["active", "ordered", "shipped", "delivered"],
         message: "Invalid value for status."
    } },
    shipping_address: { type: String }, // @OB/NE more?
    checkout_date: { type: Date } // @OB/NE default now?
});

// @OB/NE change to .getHistory
schema.statics.getCartHistory = function(user) {
    return this.find({ user_id: user._id, status: {$ne: "active"} });
}

schema.pre('validate', function(next){
    if (!this.user_id && !this.guest_id) {
        next(new Error("Must associate a user or guest with cart.")); // @OB/NE nifty!
    }
    next();
})

module.exports = mongoose.model('Cart', schema);


