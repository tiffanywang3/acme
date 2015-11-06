app.factory('UserFactory', function($rootScope, $http){
    var UserFactory = {};
    UserFactory.createUser = function(userInfo){
        return $http.post('/signup')
        .then(function(user){
            return cart
        }, function(err){
            return err;
        })
    }


    UserFactory.updateCartItem = function(cartId, productId){
        return $http.put('/api/carts/' + cartId + '/item/' + productId)
        .then(function(){
            
        }, function(err){
            return err;
        })
    }

    UserFactory.deleteCartItem = function(cartId, productId){
        return $http.delete('/api/carts/' + cartId + '/' + productId)
        .then(function(cartItem){
            return cartItem;
        }, function(err){
            return err;
        })
    }



    return UserFactory;
})

