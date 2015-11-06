app.config(function ($stateProvider) {
    $stateProvider.state('productDetails', {
        url: '/product/:productId',
        templateUrl: 'js/products/productdetail.html',
        controller: 'ProductDetailsCtrl',
        resolve: {
        	theProduct: function(ProductFactory, $stateParams) {
        		  return ProductFactory.fetchById($stateParams.productId); 
            },                   
            reviews: function(ReviewFactory, $stateParams){
                return ReviewFactory.fetchByProductId($stateParams.productId);
            },
            user: function (AuthService){
               return AuthService.getLoggedInUser();
            }
        }
    })
    
});

app.controller('ProductDetailsCtrl', function (theProduct, $scope, AuthService, $state, CartFactory, user) {
    
    // $scope.login = {};
    // $scope.error = null;
    $scope.product = theProduct;
   // $scope.reviews = reviews;
    // $scope.productCategories = theProduct.categories;
    console.log("product details - the product", $scope.product)
     //console.log("product reviews - the reviews", $scope.reviews)

     $scope.user = user;

  $scope.getInventoryNum = function(inventory) {
       if (inventory<20)
        return new Array(inventory);
       else
        return new Array(20);
   }

   $scope.addToCart = function (item){
        return CartFactory.addItem(user.active_cart, $scope.product)
        .then (function (addedItem){
            return addedItem;
        })
   }


});