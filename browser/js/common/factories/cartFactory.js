app.factory('CartFactory', function($rootScope, $http){
	var CartFactory = {};
	CartFactory.getCart = function(cartId){
		return $http.get('/api/carts/' + cartId)
		.then(function(cart){
			return cart
		}, function(err){
			return err;
		})
	}


	CartFactory.updateCartItem = function(cartId, productId){
		return $http.put('/api/carts/' + cartId + '/item/' + productId)
		.then(function(){
			
		}, function(err){
			return err;
		})
	}

	CartFactory.deleteCartItem = function(cartId, productId){
		return $http.delete('/api/carts/' + cartId + '/' + productId)
		.then(function(cartItem){
			return cartItem;
		}, function(err){
			return err;
		})
	}


	CartFactory.addItem = function(cartId, _product, _quantity){

		return $http.post('/api/carts/' + cartId, {product: _product._id, quantity: _quantity})
		.then (function(response){
			return response.data;
		}, function (err){
			return err;
		})
		
	}

	return CartFactory;
})









































