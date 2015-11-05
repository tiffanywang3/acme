var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    product_name: {type: String, required: true, unique: true},
    category: [{type: String}],
    show_name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, default: '/images/placeholder.png' },
    inventory: {type: Number, required: true},
    unit_price: {type: Number, required: true} // store prices in cents
});



schema.statics.updateInventory = function(productId, newInventory) {
    this.findByIdAndUpdate(productId,{inventory: newInventory},{ new: true })
    .then(function(updatedProduct){
    	return;
    })
}
module.exports = mongoose.model('Product', schema);
