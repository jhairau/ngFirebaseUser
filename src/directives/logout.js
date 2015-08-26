angular.module('ngFirebaseUser')
    .directive('ngFirebaseUserLogout', ['ngFirebaseUserConfig', 'ngFirebaseUserUser', '$timeout', '$state', function (ngFirebaseUserConfig, ngFirebaseUserUser, $timeout, $state) {
        return {
            restrict: 'CA',
            link: function (scope, elem) {

                // On click of the element we want to trigger the Firebase logout method
                elem.bind('click', function () {
                    $timeout(function () {
                        $state.go(ngFirebaseUserConfig.get('redirectPathLoggedOut'));
                    });
                    ngFirebaseUserUser.logout();
                });

            }
        };
    }]);
