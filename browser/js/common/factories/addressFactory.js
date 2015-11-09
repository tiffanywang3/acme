app.factory('AddressFactory', function($rootScope, $http){
    var AddressFactory = {};
    AddressFactory.updateAddress = function(id, addressInfo){
        return $http.put('/api/address/' + id, addressInfo)
        .then(function(address){
            return address.data
        }, function(err){
            return err;
        })
    }
    AddressFactory.findAddress = function(id){
        return $http.get('/api/address/' + id)
        .then(function(address){
            return address.data
        }, function(err){
            return err;
        })
    }

    AddressFactory.createAddress = function(addressInfo){
        return $http.post('/api/address/')
        .then(function(address){
            return address.data
        }, function(err){
            return err;
        })
    }

    return AddressFactory;
})

