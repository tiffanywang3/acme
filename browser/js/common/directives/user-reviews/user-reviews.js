app.directive('userReviews', function ($rootScope, AuthService, AUTH_EVENTS, ReviewFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/user-reviews/user-reviews.html',
        link: function (scope, elem, attrs) {

            // Users can only see a list of all of their own reviews.
            AuthService.getLoggedInUser()
                .then(function(user){
                    scope.user = user;
                    return ReviewFactory.fetchByUserId(user._id)
                }).then(function(reviews){
                    scope.reviews = reviews;
                })

            // used to get range for stars
            scope.getNumber = ReviewFactory.getNumber;

            // check if there are no reviews
            scope.noReviews =  function() {
                if (!scope.reviews) return true;
                else return scope.reviews.length === 0;
            }

            // edit a review
            scope.editing = false;
            var oldData = {};

            scope.editReview = function(review){
                // save old data - by copy, not reference - in case user cancels changes
                oldData.text = review.text;
                oldData.rating = review.rating;
                oldData.date = review.date;
                oldData.user_id = review.user_id;
                oldData.product_id = review.product_id;
                review.editing = true;
            }

            //check review rating (if returns TRUE, ng-disable submit buttons)
            scope.checkRating = function(num){
                if (num < 1) {
                    return true;
                }
            }

            // submit edited data to update database
            scope.submitEdits = function(review) {
                review.editing = false;
                ReviewFactory.updateReview(review._id, {
                    text: review.text,
                    rating: review.rating,
                    date: Date.now()
                })
            }

            // cancel edits
            scope.cancelEdits = function(review){
                // reassign old data back to the view
                review.text = oldData.text;
                review.rating = oldData.rating;
                review.date = oldData.date;
                review.user_id = oldData.user_id;
                review.product_id = oldData.product_id;
                review.editing = false;
            }

            // delete a review
            scope.delete = function(review){
                ReviewFactory.deleteReview(review._id)
                    .then(function(){
                        review.deleted = true;
                        review.deletedMessage = "This review has been deleted.";
                    })
            }

        }
    };
});
