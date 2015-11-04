var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    product_name: {type: String, required: true, unique: true},
    category: [{type: String, required: true}], // @OB/NE required will probably not work the way you are thinking
    show_name: {type: String, required: true}, // @OB/NE could this be a virtual?
    description: {type: String, required: true},
    imageUrl: {type: String, default: '/images/placeholder.png' },
    inventory: {type: Number, required: true},
    unitPrice: {type: Number, required: true} // @OB/NE cents makes sense
});



schema.statics.updateInventory = function(productId, newInventory) {
    this.findByIdAndUpdate(productId,{inventory: newInventory},{ new: true })
    .then(function(updatedProduct){
    	return;
    })
}
module.exports = mongoose.model('Product', schema);
