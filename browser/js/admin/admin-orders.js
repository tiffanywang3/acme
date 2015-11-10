app.config(function ($stateProvider) {
    $stateProvider.state('admin.orders', {
        url: '/orders',
        templateUrl: 'js/admin/admin-orders.html',
        controller: 'AdminOrdersCtrl',
        resolve: {
            // only pull up those that aren't active, because active carts aren't considered ordered yet.
            allOrders: function(CartFactory) {
                  return CartFactory.fetchAllOrders();           
            }
        }
    })
    
});

app.controller('AdminOrdersCtrl', function ($scope, AuthService, $state, allOrders, CartFactory) {
    
    $scope.login = {};
    $scope.error = null;
    $scope.allOrders = allOrders; 
    

    //Change the status of the order (ordered -> shipped -> delivered)
    $scope.updateOrderStatus = function (order){

        // if the cart is active, the order hasn't been made yet. So don't do anything with that.

        if (order.status === "delivered" || order.status === "cancelled"){
            alert("Order was delivered or cancelled. Can't change status.");
            return null;
        }

        if (order.status === "ordered")
            order.status = "shipped";
        else
            order.status = "delivered"; // add cancel

        CartFactory.updateStatus(order)
        .then (function (updatedOrder){
            $state.go($state.current, {}, {reload: true});
         });
    }

     $scope.cancelOrder = function (orderToCancel){
        if (orderToCancel.status === "delivered"){
            alert("Order was delivered. Can't change status.");
            return null;
        }

         if (confirm("Are you sure you want to cancel " + orderToCancel._id + "?")){
            orderToCancel.status = "cancelled";
            CartFactory.updateStatus(orderToCancel)
            .then (function (updatedOrder){
                $state.go($state.current, {}, {reload: true});
             });
        }
    }

});
