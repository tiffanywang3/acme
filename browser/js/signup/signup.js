app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.userInfo = {};
    $scope.error = null;

    $scope.createUser = function (userInfo) {

        $scope.error = null;

        AuthService.signup(userInfo)
        .then(function () {
            $state.go('products');
        }).catch(function () {
            $scope.error = 'Please enter a unique and valid email';
        });

    };

});





