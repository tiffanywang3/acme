app.config(function ($stateProvider) {
    $stateProvider.state('order', {
        url: '/order/:orderId',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        resolve: {
            // only pull up those that aren't active, because active carts aren't considered ordered yet.
            theOrder: function(CartFactory, $stateParams) {
                  return CartFactory.getOneCart($stateParams.orderId);           
            }
        }
    })
    
});

app.controller('OrderCtrl', function ($scope, AuthService, $state, theOrder) {
    $scope.order = theOrder;

    $scope.subTotal = function() {
        var total = 0;
        if(!("items" in $scope.order)) return 0;
        for (var i = 0; i<$scope.order.items.length; i++) {
            total = total + ($scope.order.items[i].quantity * $scope.order.items[i].product.unit_price);
        }
        return total/100;
    }

})