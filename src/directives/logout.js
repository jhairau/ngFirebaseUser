angular.module('ngFirebaseUser')
    .directive('ngFirebaseUserLogout', ['ngFirebaseUserConfig', 'ngFirebaseUserUser', function(ngFirebaseUserConfig, ngFirebaseUserUser) {
        return {
            restrict: 'CA',
            link: function(scope, elem) {

                // On click of the element we want to trigger the Firebase logout method
                elem.bind('click', function() {
                    ngFirebaseUserUser.logout();
                });

            }
        };
    }]);
