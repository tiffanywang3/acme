app.config(function ($stateProvider) {
    $stateProvider.state('filteredProducts', {
        url: '/products/:filterType/:filter',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory, $stateParams) {
            	if ($stateParams.filterType === "category"){
            	 console.log("the params: ", $stateParams.category)
                  return ProductFactory.fetchByCategory($stateParams.filter);  
                }
                else {
                	return ProductFactory.fetchByShowName($stateParams.filter);  
                }                 
            }
        }

    })
});



