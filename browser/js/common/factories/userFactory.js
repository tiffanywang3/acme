app.factory('UserFactory', function($http){
    var UserFactory = {};
    UserFactory.create = function(userInfo){
        return $http.post('/api/users', userInfo)
        .then(function(response){
            return response.data
        }, function(err){
            return err; // @OB/NE this will lead to some unexpected behavior
        })
    }

    UserFactory.fetchAll = function(userInfo){
        return $http.get('/api/users/')
        .then(function(response){
            return response.data
        }, function(err){
            return err;
        })
    }

    UserFactory.getOne = function(userInfo){
        //console.log("THIS IS THE USER ID TO LOOK UP", userInfo._id)
        return $http.get('/api/users/'+ userInfo._id)
        .then(function(response){
            //console.log("HERE IS THE USER FROM THE ROUTE", user)
            return response.data
        }, function(err){
            return err;
        })
    }
    UserFactory.update = function(userInfo){
        return $http.put('/api/users/' + userInfo._id, userInfo)
        .then(function(response){
            return response.data
        }, function(err){
            return err;
        })
    }


    UserFactory.retrieveHistory = function(user){
        // @OB/NE user has multiple carts?
        return $http.get('/api/users/' + user._id + "/carts")
        .then(function(response){
            console.log("HERE ARE THE CARTS", response)
            return response.data;
        }, function(err){
            return err;
        })
    }

    UserFactory.passwordReset = function(){

    }
    //passwordReset?

    UserFactory.remove = function(){
        return $http.delete('/api/users/' + userInfo._id)
        .then(function(response){
            return response.data;
        }, function(err){
            return err;
        })
    }

    return UserFactory;
})

