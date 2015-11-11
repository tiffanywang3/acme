app.factory('RecommendationFactory', function($rootScope, $http){

    var RecommendationFactory = {};

    RecommendationFactory.getRec = function(itemId) {
        return $http.get('https://thawing-coast-4564.herokuapp.com:3000/api/' + itemId)
            .then(function(response){
                return response.data
            }, function(err){
                console.error(err);
            })
    }

    RecommendationFactory.putRecs = function(cart) {
        // create array of product ids from a populated cart
        var productIDs = cart.items.map(function(item){
            return item.product._id;
        });

        var data = { items: productIDs};
        return $http.put('https://thawing-coast-4564.herokuapp.com:3000/api', data)
            .then(function(response){
                console.log("got into factory put putRecs");
                console.log("resposne.data", response.data);
                return response.data;
            }, function(err){
                console.log("error from the factory");
            })
    }

    return RecommendationFactory;
})


































