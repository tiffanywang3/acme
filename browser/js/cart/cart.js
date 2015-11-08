app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart/:cartId',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            cart: function(CartFactory, $stateParams){
                return CartFactory.getCart($stateParams.cartId);
            }

        }
    })
    
});

app.controller('CartCtrl', function (cart, $scope, AuthService, $state) {
    $scope.cartItems = cart.items;
});