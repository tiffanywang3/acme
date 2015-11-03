var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    product_name: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    show_name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, default: "/images/placeholder.png" }
    inventory: {type: Number, required: true},
    unitPrice: {type: Number, required: true}
});

mongoose.model('Product', schema);