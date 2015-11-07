app.directive('reviews', function ($rootScope, AuthService, AUTH_EVENTS, $state, ReviewFactory, ProductFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/reviews/reviews.html',
        link: function (scope, elem, attrs) {

            scope.alreadySubmitted = false;
            scope.isLoggedIn = AuthService.isAuthenticated;

            // submitting a new review.
            // get loggedIn User to append to review.
            scope.submit = function(){
                if (AuthService.isAuthenticated()) {
                    AuthService.getLoggedInUser()
                        .then(function(user){
                            // create new review in database
                            return ReviewFactory.createReview({
                                user_id: user._id,
                                product_id: attrs.product,
                                text: scope.review.text,
                                rating: scope.review.rating
                            })
                        }).then(function(newReview){
                            // update the view with new review
                            scope.reviews.push(newReview);
                            scope.alreadySubmitted = true;
                            scope.submittedMessage = "Thank you for submitting a review.";
                        })
                } else {
                    alert("You must be logged in to create reviews.");
                    //ReviewFactory.createReview({
                    //    user_id: "123",
                    //    product_id: attrs.product,
                    //    text: scope.review.text,
                    //    rating: scope.review.rating
                    //})
                }
                scope.newReviewForm.$setPristine;
            }

            // get Product from product id that was passed into directive
            ProductFactory.fetchById(attrs.product)
                .then(function(product){
                    console.log("product", product);
                    scope.product = product;
                })

            // get all Reviews for that Product
            ReviewFactory.fetchByProductId(attrs.product)
                .then(function(reviews){
                    scope.reviews = reviews;
                });

            // used to get range for stars
            scope.getNumber = function(num) {
                return new Array(num);
            }
        }
    };
});
