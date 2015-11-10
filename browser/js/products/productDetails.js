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

app.controller('ProductDetailsCtrl', function (theProduct, $scope, AuthService, $state, CartFactory, user, reviews) {

    $scope.product = theProduct;
    $scope.reviews = reviews;
    $scope.user = user;
    

  $scope.getInventoryNum = function(inventory) {
       if (inventory<20)
        return arrayGen(inventory);
       else
        return arrayGen(20);
   }

   $scope.addToCart = function (){
        CartFactory.addItem($scope.product, $scope.productToAdd.quantity.id)
        .then (function (addedItem){
            $state.go('cart');
        })
   }

   function arrayGen(el) {
      var arr=[];
      for(var i=1; i<=el; i++) {
        arr.push({id: i})
      }
      console.log(arr)
      return arr;

   }
  $scope.options = $scope.getInventoryNum($scope.product.inventory);
  $scope.productToAdd = {};
  $scope.productToAdd.quantity = $scope.options[0];

});
