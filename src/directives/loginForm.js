angular.module('ngFirebaseUser')
    .directive('ngFirebaseUserLoginForm', ['ngFirebaseUserConfig', function(ngFirebaseUserConfig) {
        return {
            scope: {},
            restrict: 'E',
            templateUrl: ngFirebaseUserConfig.get('templatePath') + '/login-form.html'
        };
    }]);
