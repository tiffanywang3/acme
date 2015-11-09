app.factory('CartFactory', function($rootScope, $http){

	var CartFactory = {};

	CartFactory.fetchAll = function (){
		return $http.get('/api/carts/')
		.then(function(carts){
			return carts.data;
		}, function(err){
			return err;
		})
	}

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


	// called from admin view only
	CartFactory.updateStatus = function (cart){

		if (cart.status === "ordered"){
			cart.status = "active";
			// switch status back to active and post to our checkout to handle the process properly
			// need to check this after merging other branches
			return $http.put('/api/carts/' + cart._id + "/checkout/")
			.then (function(response){
				return response.data;
			}, function (err){
				return err;
			})
		} else { // for all other statuses, just change the status on the backend to simulate the order process
			return $http.put('/api/carts/' + cart._id, cart)
				.then (function(response){
					return response.data;
				}, function (err){
					return err;
				})
		}

	}

	return CartFactory;
})


































