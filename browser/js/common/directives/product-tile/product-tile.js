app.directive('productTile', function(CartFactory, $state){
	return{
		restrict: 'E',
		scope: {
			product: "="
		},
		templateUrl: 'js/common/directives/product-tile/product-tile.html',
		link: function(scope, elem, attr){
			scope.addToCart = function (){
		        CartFactory.addItem(scope.product, 1)
		        .then (function (addedItem){
		            $state.go('cart');
		        })
	   		}
		}
	}
})






