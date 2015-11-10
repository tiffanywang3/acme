app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            Cart: function(CartFactory){
                return CartFactory.getCart();
            },
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            Address: function(currentUser, AddressFactory) {
                console.log("CURRENT USER", currentUser)
                if(currentUser){
                return AddressFactory.findAddress(currentUser.shipping_address)
                .then(function(user_address) {
                    console.log("USER ADDRESS", user_address)
                    return AddressFactory.createAddress({
                        number: user_address.number,
                        street: user_address.street,
                        city: user_address.city,
                        state: user_address.state,
                        country: user_address.country,
                        zipcode: user_address.zipcode
                    })
                })
                .then(function(new_address) {
                    console.log("new address", new_address)
                    return new_address;
                })
                }
                else {
                    return AddressFactory.createAddress()
                }

            }
        }
    });

});

app.controller('CheckoutCtrl', function (Cart, currentUser, Address, $scope, AuthService, AddressFactory, $state, $stateParams, CartFactory, MandrillFactory) {
    $scope.cart = Cart;

    console.log("user! ",currentUser);
    console.log("shipping", Address);
    $scope.error = null;
    $scope.user = currentUser;
    $scope.cart.shipping_address = Address;

    // AuthService.getLoggedInUser()
    // .then(function(user){
    //     $scope.user = user;
    //     return AddressFactory.findAddress(user.shipping_address)
    // })
    // .then(function(address){
    //     $scope.cart.shipping_address = address;
    // })
    // .then(null, function(err) {
    //     AddressFactory.createAddress()
    //     .then(function(address) {
    //         $scope.cart.shipping_address = address;
    //     })
    // })




    $scope.updateUserAddress = function(user, addressInfo){
        AddressFactory.updateAddress(user.shipping_address, addressInfo)
        .then(function(address){
            //$state.go($state.current, {}, {reload: true});
            location.reload();
        })
        .catch(function () {
                $scope.error = 'Something went wrong!';
        });
    }

    $scope.subTotal = function() {
        var total = 0;
        if(!("items" in $scope.cart)) return 0;
        for (var i = 0; i<$scope.cart.items.length; i++) {
            total = total + ($scope.cart.items[i].quantity * $scope.cart.items[i].product.unit_price);
        }
        return total/100;
    }

    $scope.processOrder = function() {
        console.log("STARTED PROCESSING ORDER");
        console.log("PROCESSING FOLLOWING CART", $scope.cart)

        AddressFactory.updateAddress($scope.cart.shipping_address._id,$scope.cart.shipping_address)
        .then(function() {
        if($scope.user) {
            CartFactory.checkout($scope.cart)
            .then(function(res) {
                console.log("successful checkout", res);
                MandrillFactory.sendEmail($scope.user, $scope.cart, "confirmation");
                $state.go('confirmation',{cartid: $scope.cart._id})
            })
            .then(null, function(err) {
                console.log("failed checkout", err)
            })
        }
        else {
            CartFactory.createCart($scope.cart)
            .then(function(cart) {
                console.log("created cart for guest", cart)
                return CartFactory.checkout($scope.cart)
            })
            .then(function(res) {
                console.log("successful checkout", res);
                MandrillFactory.sendEmail(null, $scope.cart, "confirmation");
                $state.go('confirmation',{cartid: $scope.cart._id})
            })
            .then(null, function(err) {
                console.log("failed checkout", err)
            })
        }
        })
    }

    // // create and send customized email for each contact in the recipients array using the template.
    // $scope.customizeEmail = function (template){

     
    //         // The render function takes a template and an object filled with properties that are used in the template. 
    //         // After an EJS is processed, it will return pure HTML, a string, that is ready to be sent in an email.
    //         var customizedTemplate = ejs.render(email, 
    //                         { firstName: contact[firstName],  
    //                           numMonthsSinceContact: contact[numMonthsSinceContact],
    //                           latestPosts: latestPosts
    //                         });

    //         //console.log(customizedTemplate);
    //         sendEmail(user.first_name, user.email, "ACME inc.", "umachandran6@gmail.com", "ACME order confirmation", customizedTemplate);
        

    // }



 //   $scope.sendEmail = function (to_name, to_email, from_name, from_email, subject, message_html){
 //    var message = {
 //        "html": message_html,
 //        "subject": subject,
 //        "from_email": from_email,
 //        "from_name": from_name,
 //        "to": [{
 //                "email": to_email,
 //                "name": to_name
 //            }],
 //        "important": false,
 //        "track_opens": true,    
 //        "auto_html": false,
 //        "preserve_recipients": true,
 //        "merge": false,
 //        "tags": [
 //            "Fullstack_Tumblrmailer_Workshop"
 //        ]    
 //    };
 //    var async = false;
 //    var ip_pool = "Main Pool";
 //    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
 //        // console.log(message);
 //        // console.log(result);   
 //    }, function(e) {
 //        // Mandrill returns the error as an object with name and message keys
 //        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
 //        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
 //    });
 // }


});

