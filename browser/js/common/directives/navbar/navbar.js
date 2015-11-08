app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' },
                { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

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
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
