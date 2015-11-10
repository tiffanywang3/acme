app.factory('RecommendationFactory', function($rootScope, $http){

    var RecommendationFactory = {};

    RecommendationFactory.getRec = function(itemId) {
        return $http.get('http://127.0.0.1:3000/api/' + itemId)
            .then(function(response){
                return response.data
            }, function(err){
                return err;
            })
    }

    RecommendationFactory.putRecs = function(cart) {
        // create array of product ids from a populated cart
        var productIDs = cart.items.map(function(item){
            return item.product._id;
        });

        var data = { items: productIDs};
        console.log("data", data);


        //return $http({
        //    method: 'PUT',
        //    url: 'http://127.0.0.1:3000/api/',
        //    headers: {
        //        'Access-Control-Allow-Origin': 'http://127.0.0.1:1337',
        //        "Access-Control-Allow-Methods": "*"
        //        },
        //    data: data
        //}).then(function successCallback(response) {
        //    console.log("got into factory put putRecs");
        //            console.log("resposne.data", response.data);
        //            return response.data;
        //}, function errorCallback(response) {
        //    console.log("Error from $http put in recommendation factory");
        //});

        return $http.put('http://127.0.0.1:3000/api', data)
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


































