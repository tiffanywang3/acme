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



	return CartFactory;
})









































