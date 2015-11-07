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

    UserFactory.fetchAll = function(){
        return $http.get('/api/users')
        .then(function(response){
            return response.data;
        }, function(err){
            return err;
        })
    }


    return UserFactory;
})

