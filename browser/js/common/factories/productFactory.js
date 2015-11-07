app.factory('ProductFactory', function ($rootScope, $http) {

	var ProductFactory = {};

	ProductFactory.fetchAll = function (){
		return $http.get('/api/products')
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ProductFactory.fetchById = function (id){
		return $http.get('/api/products/'+ id)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ProductFactory.fetchByCategory = function (cat){
		return $http.get('/api/products/categories/'+ cat)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	// May need to look at how shownames with spaces get sent through
	ProductFactory.fetchByShowName = function (show){
		return $http.get('/api/products/shows/'+ show)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ProductFactory.updateProduct = function (id, productUpdates){
		return $http.put('/api/products/'+ id, productUpdates)
		.then(function (response) {
			console.log("back in product factory", response);
			return response.data;
		}, function (error){
			return error;
		});
	}

	ProductFactory.createProduct = function (newProduct){
		return $http.post('/api/products/', newProduct)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ProductFactory.deleteProduct = function (id){
		return $http.delete('/api/products/' + id)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}


	return ProductFactory;
});