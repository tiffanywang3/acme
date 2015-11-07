app.config(function ($stateProvider) {

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl'
    });

});

app.controller('ProfileCtrl', function ($scope, AuthService, UserFactory, $state) {
    $scope.error = null;
    AuthService.getLoggedInUser().then(function(user){
        $scope.user = user;
        
    });

    $scope.updateUser = function(updatedInfo){
        if(Object.keys(updatedInfo).length > 0) updatedInfo._id = $scope.user._id;
        //console.log("here's the updated info", updatedInfo)
        AuthService.updateInfo(updatedInfo)
        .then(function(){
            //$scope.$digest;
            //$state.go($state.current, {}, {reload: true});
            location.reload();
            //$state.go('profile'); 
        })
        .catch(function () {
            $scope.error = 'Something went wrong!';
        });
    }


    //console.log(user)
    $scope.orderHistory = function(){
        console.log("THIS IS THE SCOPE.USER", $scope.user)
        // UserFactory.getOne($scope.user)
        // .then(function(user){
        //     console.log("HERES THE USER", user);
        //     return user.retrieveHistory()
        //     //console.log("THIS IS THE USER", user);
            
        // })
        UserFactory.retrieveHistory($scope.user)
        .then(function(carts){
            console.log(carts)
            $scope.carts = carts;
        })
    }

});








































