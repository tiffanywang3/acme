var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    product_name: {type: String, required: true},
    category: {type: String, required: true},
    show_name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: String,
    inventory: {type: Number, required: true},
    unitPrice: {type: Number, required: true}
});

mongoose.model('Product', schema);