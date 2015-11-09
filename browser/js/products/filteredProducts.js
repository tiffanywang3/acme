app.config(function ($stateProvider) {
    $stateProvider.state('filteredProducts', {
        url: '/products/:filterType/:filter',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            allProducts: function(ProductFactory, $stateParams) {
            	if ($stateParams.filterType === "category"){
                  return ProductFactory.fetchByCategory($stateParams.filter);  
                }
                else if ($stateParams.filterType === "search"){
                    return ProductFactory.search($stateParams.filter);
                }
                else {
                	return ProductFactory.fetchByShowName($stateParams.filter);  
                }                 
            }
        }

    })
});



