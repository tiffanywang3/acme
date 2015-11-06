app.directive('reviews', function ($rootScope, AuthService, AUTH_EVENTS, $state, ReviewFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/reviews/reviews.html',
        link: function (scope, elem, attrs) {

            console.log("attrs", attrs);

            //ReviewFactory.fetchByProductId(attrs.product)
            //    .then(function(review){
            //        console.log("review is", review);
            //    })

            var review1 = {
                firstName: "Sarah",
                lastName: "Edkins",
                title: "Love it.",
                text: "Vulpix is way too cute!",
                rating: 2,
                timestamp: Date.now(),
            }

            scope.reviews = [
                {
                    firstName: "Sarah",
                    lastName: "Edkins",
                    title: "Love it.",
                    text: "Vulpix is way too cute!",
                    rating: 5,
                    timestamp: Date.now(),
                },
                {
                    firstName: "Bob",
                    lastName: "Manguy",
                    title: "This is cool.",
                    text: "I like pokemons.",
                    rating: 3,
                    timestamp: Date.now(),
                }
            ]


            scope.getNumber = function(num) {
                console.log("num", num);
                return new Array(num);
            }

        }

    };

});

//scope.reviews = [
//  {
//        user_id: "563cdc5b8a706b4209f33cfb",
//        product_id: "563cdc5d6c8e584309189538",
//        text: "Vulpix is too cute!",
//        rating: 4
//    },
//    {
//        user_id: "563cdc5b8a706b4209f33cfb",
//        product_id: "563cdc5d6c8e584309189538",
//        text: "Vulpix is too just WAY cute!",
//        rating: 5
//    }
//];


//     <reviews product="563cdc5d6c8e584309189538" ></reviews>
