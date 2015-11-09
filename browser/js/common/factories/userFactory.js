app.factory('UserFactory', function($rootScope, $http){
    var UserFactory = {};
    UserFactory.createUser = function(userInfo){
        return $http.post('/api/users', userInfo)
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }


    UserFactory.fetchAll = function(userInfo){
        return $http.get('/api/users/')
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }

    UserFactory.getOne = function(userInfo){
        //console.log("THIS IS THE USER ID TO LOOK UP", userInfo._id)
        return $http.get('/api/users/'+ userInfo._id)
        .then(function(user){
            //console.log("HERE IS THE USER FROM THE ROUTE", user)
            return user.data
        }, function(err){
            return err;
        })
    }
    UserFactory.updateUser = function(userInfo){
        return $http.put('/api/users/' + userInfo._id, userInfo)
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }


    UserFactory.retrieveHistory = function(user){
        return $http.get('/api/users/' + user._id + "/carts")
        .then(function(carts){
            console.log("HERE ARE THE CARTS", carts)
            return carts.data;
        }, function(err){
            return err;
        })
    }

    UserFactory.passwordReset = function(user){
        return $http.put('/api/users/'+ user._id + '/password', user)
        .then(function(carts) {
            return carts.data;
        })
    }
    //passwordReset?

    UserFactory.deleteUser = function(id){
        return $http.delete('/api/users/' + id)
        .then(function(user){
            return user.data;
        }, function(err){
            return err;
        })
    }

    return UserFactory;
})

