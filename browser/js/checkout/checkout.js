app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            Cart: function(CartFactory){
                return CartFactory.getCart();
            }
        }
    });

});

app.controller('CheckoutCtrl', function (Cart, $scope, AuthService, AddressFactory, $state, CartFactory) {
    $scope.cart = Cart;

    console.log("cart! ",$scope.cart);
    $scope.error = null;

    // OB/NE resolve? maybe also place logic in factory?
    AuthService.getLoggedInUser()
    .then(function(user){
        $scope.user = user;
        return AddressFactory.findAddress(user.shipping_address)
    })
    .then(function(address){
        //$scope.address = address;
        $scope.cart.shipping_address = address;
    })
    .then(null, function(err) {
        AddressFactory.createAddress()
        .then(function(address) {
            $scope.cart.shipping_address = address;
        })
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

    // @OB/NE duplicated code: put it in a factory!
    $scope.subTotal = function() {
        var total = 0;
        if(!("items" in $scope.cart)) return 0;
        for (var i = 0; i<$scope.cart.items.length; i++) {
            total = total + ($scope.cart.items[i].quantity * $scope.cart.items[i].product.unit_price);
        }
        return total/100;
    }

    // @OB/NE put logic into factory?
    $scope.processOrder = function() {
        console.log("STARTED PROCESSING ORDER");
        console.log("PROCESSING FOLLOWING CART", $scope.cart)
        if($scope.user) {
            CartFactory.checkout($scope.cart)
            .then(function(res) {
                console.log("successful checkout", res);
                $state.go('confirmation',{cartid: $scope.cart._id})
            })
            .then(null, function(err) {
                console.log("failed checkout", err)
            })
        }
        else {
            CartFactory.createCart($scope.cart)
            .then(function(cart) {
                console.log("created cart for guest", cart)
                return CartFactory.checkout($scope.cart)
            })
            .then(function(res) {
                console.log("successful checkout", res);
                $state.go('confirmation',{cartid: $scope.cart._id})
            })
            .then(null, function(err) {
                console.log("failed checkout", err)
            })
        }
    }

});

