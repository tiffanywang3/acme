app.directive('acmeLogo', function () {
    return {
        restrict: 'E',
        template: '<a ui-sref="products"><img style="height:50px; width:100px" src="js/common/directives/acme-logo/acmeInc.png"></a>'
    };
});