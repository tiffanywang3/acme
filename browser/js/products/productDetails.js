app.config(function ($stateProvider) {
    $stateProvider.state('productDetails', {
        url: 'product/:productId',
        templateUrl: 'js/products/productdetail.html',
        controller: 'ProductDetailsCtrl',
        resolve: {
        	theProduct: function(ProductFactory, $stateParams) {
        		  return ProductFactory.fetchById($stateParmas.productId);                    
        	},
            reviews: function(ReviewFactory, $stateParams){
                return ReviewFactory.fetchByProductId($stateParams.productId);
            }
        }
    })
    
});

app.controller('ProductDetailsCtrl', function (theProduct, reviews, $scope, AuthService, $state) {
    
    $scope.login = {};
    $scope.error = null;
    $scope.product = theProduct;
    $scope.reviews = reviews;
    console.log("product details - the product", $scope.product)
    console.log("product reviews - the reviews", $scope.reviews)

    // $scope.allProducts = [{product_name:"test produ",unitPrice:"333",imageUrl:"/images/adventuretime_finnsword.jpg"},{product_name:"test product2",unitPrice:"444",imageUrl:"/images/adventuretime_gumbball.jpg"} ,{product_name:"test product3",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product4",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product5",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product6",unitPrice:"666", imageUrl:"/images/placeholder.png"}]
    

});