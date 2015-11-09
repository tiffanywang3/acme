app.factory('CartFactory', function($rootScope, $http){

	var CartFactory = {};
	CartFactory.getCart = function(){
		return $http.get('/api/carts/')
		.then(function(cart){
			console.log("CART", cart)
			return cart.data
		}, function(err){
			return err;
		})
	}


	CartFactory.updateCartItem = function(updatedLineItem){
		return $http.put('/api/carts/item/' + updatedLineItem.product, updatedLineItem)
		.then(function(response){
			return response.data;
		}, function(err){
			return err;
		})
	}

	CartFactory.deleteCartItem = function(productId){
		return $http.delete('/api/carts/item/' + productId)
		.then(function(cartItem){
			return cartItem;
		}, function(err){
			return err;
		})
	}


	CartFactory.addItem = function(_product, _quantity){

		return $http.post('/api/carts/item/'+_product._id, {product: _product._id, quantity: _quantity})
		.then (function(response){
			return response.data;
		}, function (err){
			return err;
		})
		
	}

	return CartFactory;
})


































