app.directive('reviews', function ($rootScope, AuthService, AUTH_EVENTS, ReviewFactory) {

    return {
        restrict: 'E',
        scope: {
            user: "=",
            reviews: "=",
            product: "="
        },
        templateUrl: 'js/common/directives/reviews/reviews.html',
        link: function (scope, elem, attrs) {

            // check if there are no reviews
            scope.noReviews =  function() {
                if (!scope.reviews) return true;
                else return scope.reviews.length === 0;
            }

            scope.alreadySubmitted = false;
            scope.noReviewsMessage = "Be the first to leave a review!";

            // check if user is logged in
            scope.isLoggedIn = function(){
               return AuthService.isAuthenticated();
            };

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
                    newReview.user_id = scope.user;
                    scope.reviews.push(newReview);
                    scope.alreadySubmitted = true;
                    scope.submittedMessage = "Thank you for submitting a review.";
                    scope.newReviewForm.$setPristine = true;
                    })
                }

            // used to get range for stars
            scope.getNumber = ReviewFactory.getNumber;

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
