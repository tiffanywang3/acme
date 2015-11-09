app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $uibModal) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function (user) {
            console.log("user", user);
            $scope.user = user;
            if(user.dirtypassword == true) {
                $scope.promptReset()
            }
            else {
                $state.go('products');
            }
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };


    $scope.promptReset = function () {
        var resetModal = $uibModal.open({
          animation: $scope.animationsEnabled,
          template: '<div class="container row form-group"><div class="col-xs-4"><label for="signup-password">Please reset your password:</label> <input type="password" ng-model="user.password" class="form-control" id="signup-password" placeholder="Update Password"</div><br> <button type="submit" ng-click="updatePassword()" class="btn btn-primary">Submit</button></div></div>',
          controller: 'resetModalCtrl',
          resolve: {
            user: function () {
              return $scope.user;
            }
          }
        });

        resetModal.result.then(function () {
          $state.go('products')
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };








});

app.controller('resetModalCtrl', function (UserFactory, $scope, $uibModalInstance, user) {

  $scope.user = user;

  $scope.updatePassword = function(updatedPassword) {
    UserFactory.passwordReset(user)
    .then(function(user){
        $uibModalInstance.close();
    })
  }

});
