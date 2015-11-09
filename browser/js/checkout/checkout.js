app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });

});

app.controller('CheckoutCtrl', function ($scope, AuthService, AddressFactory, $state) {

    $scope.error = null;

    AuthService.getLoggedInUser()
    .then(function(user){
        $scope.user = user;
        return AddressFactory.findAddress(user.shipping_address)
    })
    .then(function(address){
        $scope.address = address;
    })

    $scope.updateUserAddress = function(user, addressInfo){
        AddressFactory.updateAddress(user.shipping_address, addressInfo)
        .then(function(address){
            //$state.go($state.current, {}, {reload: true});
            location.reload();
        })
        .catch(function () {
                $scope.error = 'Something went wrong!';
        });
    }

});

