app.factory('UserFactory', function($rootScope, $http){
    var UserFactory = {};
    UserFactory.createUser = function(userInfo){
        return $http.post('/signup', userInfo)
        .then(function(cart){
            return cart
        }, function(err){
            return err;
        })
    }


    return UserFactory;
})

