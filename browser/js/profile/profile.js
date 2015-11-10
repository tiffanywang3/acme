app.config(function ($stateProvider) {

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            Address: function(currentUser, AddressFactory) {
                return AddressFactory.findAddress(currentUser.shipping_address)
            }
        }
    });

});

app.controller('ProfileCtrl', function ($uibModal, currentUser, Address, $scope, AuthService, UserFactory, AddressFactory, $state) {
    $scope.error = null;
    $scope.user = currentUser;
    $scope.address = Address;

    // AuthService.getLoggedInUser()
    // .then(function(user){
    //     $scope.user = user;
    //     console.log("USER",$scope.user);
    //     return AddressFactory.findAddress(user.shipping_address)
    // })
    // .then(function(address){
    //     $scope.address = address;
    // })

    

    $scope.updateUser = function(updatedInfo, addressInfo){
        // Address info looks ok console.log("HERES THE ADDRESS INFO", addressInfo)
        if(Object.keys(updatedInfo).length > 0) updatedInfo._id = $scope.user._id;
        //console.log("here's the updated info", updatedInfo)
        UserFactory.updateUser(updatedInfo)
        .then(function(user){
            //$scope.$digest;
            //$state.go($state.current, {}, {reload: true});
            console.log("Here's the updated user", user)
            return AddressFactory.updateAddress(user.shipping_address, addressInfo)
            //$state.go('profile'); 
        })
        .then(function(address){
            $scope.address = address;
            location.reload();
        })
        .catch(function () {
            $scope.error = 'Something went wrong!';
        });
    }


    //console.log(user)
    $scope.orderHistory = function(){
        //console.log("THIS IS THE SCOPE.USER", $scope.user)
        UserFactory.retrieveHistory($scope.user)
        .then(function(carts){
            //console.log(carts)
            $scope.carts = carts;
        })
    }

     $scope.promptReset = function () {
        var resetModal = $uibModal.open({
          //animation: $scope.animationsEnabled,
          template: '<div class="container row form-group"><div class="col-xs-4"><label for="signup-password">Please reset your password:</label> <input type="password" ng-model="user.password" class="form-control" id="signup-password" placeholder="Update Password"</div><br> <button type="submit" ng-click="updatePassword()" class="btn btn-primary">Submit</button></div></div>',
          controller: 'resetModalCtrl',
          resolve: {
            user: function () {
              return $scope.user;
            }
          }
        });

        resetModal.result.then(function () {
          //$state.go($state.current, {}, {reload: true});
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

});





































