app.factory('RecommendationFactory', function($rootScope, $http){

    var RecommendationFactory = {};

    // get cart by id
    RecommendationFactory.getRec = function(itemId) {
        return $http.get('/api/'+ itemId)
            .then(function(response){
                return response.data
            }, function(err){
                return err;
            })
    }

    return RecommendationFactory;
})


































