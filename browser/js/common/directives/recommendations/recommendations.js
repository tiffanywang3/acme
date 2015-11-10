app.directive('recommendation', function(RecommendationFactory){
    return{
        restrict: 'E',
        scope: {
            productId: "="
        },
        templateUrl: 'js/common/directives/recommendations/recommendations.html',
        link: function(scope, elem, attr){

            //  scope.cart.items

            scope.addToCart = function (prodId){
                RecommendationFactory.getRec(prodId)
                    .then (function (recommendedProducts){
                    scope.recommendedProducts = recommendedProducts;
                })
            }
        }
    }
})
