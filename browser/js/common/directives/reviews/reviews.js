app.directive('reviews', function ($rootScope, AuthService, AUTH_EVENTS, $state, ReviewFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/reviews/reviews.html',
        link: function (scope, elem, attrs) {

            ReviewFactory.fetchByProductId(attrs.product)
                .then(function(reviews){
                    scope.reviews = reviews
                });

            scope.getNumber = function(num) {
                return new Array(num);
            }

        }
    };

});


// To use directive: <reviews product="563cdc5d6c8e584309189538" ></reviews>
