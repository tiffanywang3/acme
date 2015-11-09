app.config(function ($stateProvider) {
    $stateProvider.state('admin.addproduct', {
        url: '/add/',
        templateUrl: 'js/admin/add-product.html',
        controller: 'AdminAddProductCtrl'
    })
    
});

app.controller('AdminAddProductCtrl', function ($scope, AuthService, $state, ProductFactory) {
    
    $scope.login = {};
    $scope.error = null;
    //console.log($scope.allProducts)


    // $scope.allProducts = [{product_name:"test produ",unitPrice:"333",imageUrl:"/images/adventuretime_finnsword.jpg"},{product_name:"test product2",unitPrice:"444",imageUrl:"/images/adventuretime_gumbball.jpg"} ,{product_name:"test product3",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product4",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product5",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product6",unitPrice:"666", imageUrl:"/images/placeholder.png"}]
    console.log($scope.product)
    $scope.createProduct = function (){
         ProductFactory.createProduct($scope.product)
         .then (function (newProduct){
            $scope.product = newProduct;
            console.log("Updated!");
         });
      
    }


});