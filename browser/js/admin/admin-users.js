app.config(function ($stateProvider) {
    $stateProvider.state('admin.users', {
        url: '/',
        templateUrl: 'js/admin/admin-users.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            allUsers: function(UserFactory) {
                  return UserFactory.fetchAll();                    
            }
        } 
    })
    
});

app.controller('AdminUsersCtrl', function ($scope, AuthService, $state, allUsers, UserFactory) {
    
    $scope.login = {};
    $scope.error = null;
    //console.log("all ", allUsers);
    $scope.allUsers = allUsers;
    //console.log($scope.allProducts)

    // $scope.allProducts = [{product_name:"test produ",unitPrice:"333",imageUrl:"/images/adventuretime_finnsword.jpg"},{product_name:"test product2",unitPrice:"444",imageUrl:"/images/adventuretime_gumbball.jpg"} ,{product_name:"test product3",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product4",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product5",unitPrice:"666",imageUrl:"/images/adventuretime_finnhat.jpg"}, {product_name:"test product6",unitPrice:"666", imageUrl:"/images/placeholder.png"}]
    

});