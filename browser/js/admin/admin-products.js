app.config(function ($stateProvider) {
    $stateProvider.state('admin.products', {
        url: '/products',
        templateUrl: 'js/admin/admin-products.html',
        controller: 'AdminProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                  return ProductFactory.fetchAll();                    
            }
        } 
    })
    
});

app.controller('AdminProductsCtrl', function ($scope, AuthService, $state, allProducts, ProductFactory, $timeout) {
    
    $scope.login = {};
    $scope.error = null;
    $scope.allProducts = allProducts;
    //console.log($scope.allProducts)

   $scope.prodDeleted = false;

    $scope.deleteProduct = function (productToDel){
        console.log("in delete product ", productToDel);
         if (confirm("Are you sure you want to delete " + productToDel.product_name + "?")){
            ProductFactory.deleteProduct(productToDel._id)
            .then(function(){

                $scope.prodDeleted = true; // trigger confirmation message on the page

                $timeout(function() {
                    $state.go($state.current, {}, {reload: true}); // reload after 3 seconds
                }, 3000);


                
                
            })
        }
    }

});