app.config(function ($stateProvider) {
    $stateProvider.state('admin.editproduct', {
        url: '/edit/:productId',
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
    //console.log($scope.allProducts)

    // $scope.allProducts = [{product_name:"test produ",unitPrice:"333",imageUrl:"/images/adventuretime_finnsword.jpg"},{product_name:"test product2",unitPrice:"444",imageUrl:"/images/adventuretime_gumbball.jpg"} ,{product_name:"test product3",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product4",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product5",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product6",unitPrice:"666", imageUrl:"/images/placeholder.png"}]
    console.log($scope.product)
    $scope.updateProduct = function (){
         ProductFactory.updateProduct($scope.product._id, $scope.product)
         .then (function (updatedProduct){
            $scope.product = updatedProduct;
            console.log("Updated!");
         });
      
    }


});