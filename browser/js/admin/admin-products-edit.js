app.config(function ($stateProvider) {
    $stateProvider.state('admin.editproduct', {
        url: '/products/edit/:productId',
        templateUrl: 'js/admin/edit-product.html',
        controller: 'AdminEditProductsCtrl',
        resolve: {
           theProduct: function(ProductFactory, $stateParams) {
                  return ProductFactory.fetchById($stateParams.productId);                    
            }
        } 
    })
    
});

app.controller('AdminEditProductsCtrl', function ($scope, AuthService, $state, theProduct, ProductFactory) {
    
    $scope.login = {};
    $scope.error = null;
    $scope.product = theProduct;

    $scope.updateProduct = function (){

       // convert category field back into an array before updating
       if ($scope.product.category.indexOf(",")!==-1){
         $scope.product.category = $scope.product.category.split(", ");
       } else if ($scope.product.category === '[' + $scope.product.category + "]"){
          $scope.product.category = [$scope.product.category.slice(1,$scope.product.category.length)];
        }else{
          $scope.product.category = [$scope.product.category]
       }
       
         ProductFactory.updateProduct($scope.product._id, $scope.product)
         .then (function (updatedProduct){
            $scope.product = updatedProduct;
            
             $state.go('admin.products');
         });
      
    }


});