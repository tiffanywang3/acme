'use strict';
var mongoose = require("mongoose");
var Address = require ("./address");
var validate = require('mongoose-validate')


var schema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    guest_id: String,
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: { type: Number, required: true},
        unit_price_paid: { type: Number}
        }],
    status: { type: String, required: true, enum: {
         values: ["active", "ordered", "shipped", "delivered", "cancelled"],
         message: "Invalid value for status."
    } },
    shipping_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: false },
    checkout_date: { type: Date },
    email: {
        type: String,
        validate: [validate.email, 'invalid email address']
    }
});


schema.statics.getHistory = function(userId) {
    console.log("got into cart.getHistory", userId)
    return this.find({ user_id: userId, status:{$ne:'active'}});
}

schema.statics.makeCart = function(user){
    return this.create({user_id: user._id, status:'active'})
}
// schema.pre('validate', function(next){
//     if (!this.user_id && !this.guest_id) {
//         next(new Error("Must associate a user or guest with cart."));
//     }
//     next();
// })

module.exports = mongoose.model('Cart', schema);





