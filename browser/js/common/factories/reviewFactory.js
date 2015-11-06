app.factory('ReviewFactory', function ($rootScope, $http) {

	var ReviewFactory = {};

	ReviewFactory.fetchAll = function (){
		return $http.get('/api/reviews')
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ReviewFactory.fetchByProductId = function (id){
		return $http.get('/api/reviews/product/'+ id)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ReviewFactory.fetchByUserId = function (id){
		return $http.get('/api/reviews/user/'+ id)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ReviewFactory.createReview = function (newReview){
		return $http.post('/api/reviews/', newReview)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}

	ReviewFactory.updateReview = function (id, reviewUpdates){
		return $http.put('/api/reviews/'+ id, reviewUpdates)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}


	ReviewFactory.deleteReview = function (id){
		return $http.delete('/api/reviews/' + id)
		.then(function (response) {
			return response.data;
		}, function (error){
			return error;
		});
	}


	return ReviewFactory;
});