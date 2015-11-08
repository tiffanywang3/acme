app.directive('userReviews', function ($rootScope, AuthService, AUTH_EVENTS, ReviewFactory, ProductFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/user-reviews/user-reviews.html',
        link: function (scope, elem, attrs) {

            // TODO Product names should link to product detail pages

            // This assumes users can only see their own reviews (no one elses) & only when that user is logged in.
            // TODO User Factory to get user by ID - to see reviews of other users???
            AuthService.getLoggedInUser()
                .then(function(user){
                    scope.user = user;
                    return ReviewFactory.fetchByUserId(user._id)
                }).then(function(reviews){
                    scope.reviews = reviews;
                })

            // used to get range for stars
            scope.getNumber = function(num) {
                return new Array(num);
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
                console.log("review in submitEdits", review);
                ReviewFactory.updateReview(review._id, {
                    text: review.text,
                    rating: review.rating,
                    date: Date.now()
                })
            }

            // cancel edits
            scope.cancelEdits = function(review){
                console.log("review in cancel is", review);
                console.log("oldData", oldData);

                // reassign old data back to the view
                review.text = oldData.text;
                review.rating = oldData.rating;
                review.date = oldData.date;
                review.user_id = oldData.user_id;
                review.product_id = oldData.product_id;
                console.log("cancelled edits");
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
