app.config(function ($stateProvider) {
    $stateProvider.state('admin.users', {
        url: '/users',
        templateUrl: 'js/admin/admin-users.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            allUsers: function(UserFactory) {
                  return UserFactory.fetchAll();                    
            }
        } 
    })
    
});

app.controller('AdminUsersCtrl', function ($scope, AuthService, $state, allUsers, UserFactory, $timeout) {
    
    $scope.login = {};
    $scope.error = null;

    $scope.allUsers = allUsers;
    $scope.userDeleted = false;

    $scope.switchUserType = function (userToUpdate){
        var newType;
        if (userToUpdate.type === "customer")
            newType = "admin";
        else {
            newType = "customer";
        }

        if (confirm("Are you sure you want to switch " + userToUpdate.email + " to " + newType + "?")){
            userToUpdate.type = newType;
            UserFactory.updateUser(userToUpdate)
            .then(function(){
                $state.go($state.current, {}, {reload: true});
            })
        }
    }

    $scope.deleteUser = function (userToDel){
        AuthService.getLoggedInUser()
        .then (function (loggedInUser){
            if (loggedInUser._id === userToDel._id)
                alert("Sorry, you can't delete yourself");
            else{
                if (confirm("Are you sure you want to delete " + userToDel.email + "?")){
                    UserFactory.deleteUser(userToDel._id)
                    .then(function(){
                        $scope.userDeleted = true; // trigger confirmation message on the page

                        $timeout(function() {
                            $state.go($state.current, {}, {reload: true}); // reload after 3 seconds
                        }, 3000);
                    })
                }
            }
        })

    }

    $scope.reserUserPassword = function(userToReset) {
        userToReset.dirtypassword = true;
        console.log("hi")
        UserFactory.updateUser(userToReset)
        .then(function(updatedUser) {
            alert("User will be prompted to reset password at next login");
        })
        .then(null,function(err){ 
            alert("Error resetting password")
        })
    }



});