app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, ProductFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {


            scope.categories= [
                { name: 'Accessories', text:'Accessories'},
                { name: 'Clothes', text:'Clothes'},
                { name: 'Creatures', text:'Creatures'},
                { name: 'Food', text:'Food'},
                { name: 'Home', text:'Home'},
                { name: 'Weapons', text:'Weapons'},
                { name: 'Vehicles', text:'Vehicles'},
            ];

            scope.shows= [
                { name: "Adventure Time"},
                { name: "Avatar"},
                { name: "Bob's Burgers"},
                { name: "Care Bears"},
                { name: "Ghostbusters"},
                { name: "Looney Tunes"},
                { name: "Pokemon"},
                { name: "Popeye"},
                { name: "The Simpsons"},
                { name: "Scooby Doo"},
                { name: "South Park"},
                { name: "Spongebob Squarepants"},
            ];

            scope.user = null;
            scope.admin = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('products');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    if(user) {
                        scope.user = user;
                        if (user.type === "admin")
                            scope.admin = true;
                    }
                });

            };

            var removeUser = function () {
                scope.user = null;
                scope.admin = false;
            };

            setUser();

            scope.doSearch = function (){
                $state.go('filteredProducts', {filterType: "search", filter: scope.search.searchterm})
            }

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
