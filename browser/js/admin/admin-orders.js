app.config(function ($stateProvider) {
    $stateProvider.state('admin.orders', {
        url: '/',
        templateUrl: 'js/admin/admin-orders.html',
        controller: 'AdminOrdersCtrl',
        resolve: {
            allOrders: function(CartFactory) {
                  return CartFactory.fetchAll();  // get only those with a certain status.                   
            }
        }
    })
    
});

app.controller('AdminOrdersCtrl', function ($scope, AuthService, $state, allOrders, CartFactory) {
    
    $scope.login = {};
    $scope.error = null;
    $scope.allOrders = allOrders;

    //Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
    $scope.updateOrderStatus = function (order){
        if (order.status === "active")
            order.status = "ordered"; // checkout instead?
        else if (order.status === "ordered")
            order.status = "shipped";
        else
            order.status = "delivered";

        CartFactory.updateStatus(order)
        .then (function (updatedOrder){
            $state.go($state.current, {}, {reload: true});
         });
    }

});
