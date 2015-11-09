app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart/',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            Cart: function(CartFactory, $stateParams){
                return CartFactory.getCart();
            }

        }
    })
    
});

app.controller('CartCtrl', function (Cart, CartFactory, $scope, AuthService, $state) {
    $scope.cart = Cart;
    $scope.updateQty = function(product, qty) {
        console.log("got in here")
        var updatedLineItem = {product: product._id, quantity: qty}

        if (Number.isInteger(qty) === true && qty <= product.inventory && qty > 0) {
            CartFactory.updateCartItem(updatedLineItem)
            .then(function(cart) {
                //$state.go($state.current, {}, {reload: true});
                location.reload();
            }, function(err) {
                console.log(err)
            })
        }
        else {
            location.reload();
        }
            
    }
    $scope.deleteItem = function(deletedItem) {
        console.log(deletedItem)
        CartFactory.deleteCartItem(deletedItem)
        .then(function() {
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
