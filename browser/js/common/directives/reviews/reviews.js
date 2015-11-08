app.directive('reviews', function ($rootScope, AuthService, AUTH_EVENTS, ReviewFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/reviews/reviews.html',
        link: function (scope, elem, attrs) {

            scope.alreadySubmitted = false;

            // save variables passed into directive onto scope
            scope.product = attrs.product;
            scope.reviews = attrs.reviews;

            // convert JSON to regular objects
            scope.product = JSON.parse(scope.product);
            scope.reviews = Array.prototype.slice.call(JSON.parse(scope.reviews));

            // check if user is logged in
            scope.isLoggedIn = function(){
               return AuthService.isAuthenticated();
            };

            // set up user
            (function () {
                if (scope.isLoggedIn()){
                    scope.user = attrs.user;
                    scope.user = JSON.parse(scope.user);

                }
            })()

            // submitting a new review.
            scope.submit = function(review){
                   // create new review
                   ReviewFactory.createReview({
                        user_id: scope.user._id,
                        product_id: scope.product._id,
                        text: review.text,
                        rating: review.rating
                    }).then(function(newReview){
                    // update the view with new review
                    scope.reviews.unshift(newReview);
                    scope.alreadySubmitted = true;
                    scope.submittedMessage = "Thank you for submitting a review.";
                    scope.newReviewForm.$setPristine = true;
                    })
                }

            // used to get range for stars
            scope.getNumber = function(num) {
                return new Array(num);
            }

            //check review rating
            scope.checkRating = function(num){
                if (num < 1) {
                    return true;
                }
            }

            // calculate product's average rating
            scope.averageRating = function(){
                var sum = 0;
                var count = scope.reviews.length;
                scope.reviews.forEach(function(review){
                    sum += review.rating;
                })
                return sum / count;
            }
        }
    };
});
