app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;
    //$scope.allProducts = allProducts;

    $scope.allProducts = [{product_name:"test produ",unitPrice:"333"},{product_name:"test product2",unitPrice:"444"} ]
    

});