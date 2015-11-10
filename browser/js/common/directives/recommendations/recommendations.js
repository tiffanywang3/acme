app.directive('recommendation', function(RecommendationFactory, ProductFactory){
    return{
        restrict: 'E',
        scope: {
            product: "="
        },
        templateUrl: 'js/common/directives/recommendations/recommendations.html',
        link: function(scope, elem, attr){
            var prodIds;
            scope.recommendedProducts= [];
            //  scope.cart.items
            RecommendationFactory.getRec(scope.product)
            .then(function(prods){
                //scope.recommendedProducts = prods;
                prodIds = prods;
                
                return ProductFactory.fetchById(prodIds[0])
            })
            .then(function(prod1){
                scope.recommendedProducts.push(prod1)
                return ProductFactory.fetchById(prodIds[1])
            })
            .then(function(prod2){
                scope.recommendedProducts.push(prod2)
                return ProductFactory.fetchById(prodIds[2])
            })
            .then(function(prod3){
                    scope.recommendedProducts.push(prod3)
            })

            scope.noRecs = function(){
               if (!scope.recommendedProducts) return true;
               return scope.recommendedProducts.length === 0;
            }
        }
    }
})
