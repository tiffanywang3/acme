app.config(function ($stateProvider) {

    $stateProvider.state('confirmation', {
        url: '/confirmation/:cartid',
        templateUrl: 'js/confirmation/confirmation.html',
        controller: 'ConfirmationCtrl',
        resolve: {
            Cart: function(CartFactory, $stateParams){
                return CartFactory.getOneCart($stateParams.cartid);
            }

        }
    });

});
app.controller('ConfirmationCtrl', function (Cart, CartFactory, $scope, AuthService, $state, $stateParams) {

    $scope.cart = Cart;
    $scope.updateQty = function(product, qty) {
        var updatedLineItem = {product: product, quantity: qty}
        CartFactory.updateCartItem(updatedLineItem)
        .then(function(cart) {
            //$state.go($state.current, {}, {reload: true});
            location.reload();
        }, function(err) {
            console.log(err)
        })
    }

    $scope.subTotal = function() {
        var total = 0;
        if(!("items" in $scope.cart)) return 0;
        for (var i = 0; i<$scope.cart.items.length; i++) {
            total = total + ($scope.cart.items[i].quantity * $scope.cart.items[i].product.unit_price);
        }
        return total/100;
    }
});

