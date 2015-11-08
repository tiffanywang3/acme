app.factory('AddressFactory', function($rootScope, $http){
    var AddressFactory = {};
    AddressFactory.updateAddress = function(id, userInfo){
        return $http.put('/api/address' + id, userInfo)
        .then(function(user){
            return user.data
        }, function(err){
            return err;
        })
    }

    return AddressFactory;
})

