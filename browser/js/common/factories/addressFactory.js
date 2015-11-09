app.factory('AddressFactory', function($rootScope, $http){
    var AddressFactory = {};
    AddressFactory.update = function(id, addressInfo){
        return $http.put('/api/address/' + id, addressInfo)
        .then(function(address){
            return address.data
        })
    }
    AddressFactory.find = function(id){
        return $http.get('/api/address/' + id)
        .then(function(address){
            return address.data
        })
    }

    AddressFactory.create = function(addressInfo){
        return $http.post('/api/address/')
        .then(function(address){
            return address.data
        })
    }

    return AddressFactory;
})