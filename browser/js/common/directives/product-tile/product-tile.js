app.directive('productTile', function(){
	return{
		restrict: 'E',
		scope: {
			product: "="
		},
		templateUrl: 'js/common/directives/product-tile/product-tile.html'
	}
})