app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            Cart: function(CartFactory){
                return CartFactory.getCart();
            },
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            Address: function(currentUser, AddressFactory) {
                console.log("CURRENT USER", currentUser)
                if(currentUser){
                return AddressFactory.findAddress(currentUser.shipping_address)
                .then(function(user_address) {
                    console.log("USER ADDRESS", user_address)
                    return AddressFactory.createAddress({
                        number: user_address.number,
                        street: user_address.street,
                        city: user_address.city,
                        state: user_address.state,
                        country: user_address.country,
                        zipcode: user_address.zipcode
                    })
                })
                .then(function(new_address) {
                    console.log("new address", new_address)
                    return new_address;
                })
                }
                else {
                    return AddressFactory.createAddress()
                }

            }
        }
    });

});

app.controller('CheckoutCtrl', function (Cart, currentUser, Address, $scope, AuthService, AddressFactory, $state, $stateParams, CartFactory) {
    $scope.cart = Cart;


    console.log("user! ",currentUser);
    console.log("shipping", Address);
    $scope.error = null;
    $scope.user = currentUser;
    $scope.cart.shipping_address = Address;
    if(currentUser)
        $scope.cart.email = currentUser.email;

    // AuthService.getLoggedInUser()
    // .then(function(user){
    //     $scope.user = user;
    //     return AddressFactory.findAddress(user.shipping_address)
    // })
    // .then(function(address){
    //     $scope.cart.shipping_address = address;
    // })
    // .then(null, function(err) {
    //     AddressFactory.createAddress()
    //     .then(function(address) {
    //         $scope.cart.shipping_address = address;
    //     })
    // })




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

    $scope.subTotal = function() {
        var total = 0;
        if(!("items" in $scope.cart)) return 0;
        for (var i = 0; i<$scope.cart.items.length; i++) {
            total = total + ($scope.cart.items[i].quantity * $scope.cart.items[i].product.unit_price);
        }
        return total/100;
    }

    $scope.processOrder = function() {
        console.log("STARTED PROCESSING ORDER");
        console.log("PROCESSING FOLLOWING CART", $scope.cart)

        AddressFactory.updateAddress($scope.cart.shipping_address._id,$scope.cart.shipping_address)
        .then(function() {
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
        })
    }

});

