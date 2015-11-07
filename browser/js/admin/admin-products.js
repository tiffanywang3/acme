app.config(function ($stateProvider) {
    $stateProvider.state('admin.products', {
        url: '/',
        templateUrl: 'js/admin/admin-products.html',
        controller: 'AdminProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory) {
                  return ProductFactory.fetchAll();                    
            }
        } 
    })
    
});

app.controller('AdminProductsCtrl', function ($scope, AuthService, $state, allProducts, ProductFactory) {
    
    $scope.login = {};
    $scope.error = null;
    $scope.allProducts = allProducts;
    //console.log($scope.allProducts)

    // $scope.allProducts = [{product_name:"test produ",unitPrice:"333",imageUrl:"/images/adventuretime_finnsword.jpg"},{product_name:"test product2",unitPrice:"444",imageUrl:"/images/adventuretime_gumbball.jpg"} ,{product_name:"test product3",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product4",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product5",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product6",unitPrice:"666", imageUrl:"/images/placeholder.png"}]
    
    $scope.deleteProduct = function (id){
        console.log("in delete product ", id);
        ProductFactory.deleteProduct(id)
        .then(function(){
            $state.go($state.current, {}, {reload: true});
        })
    }

});