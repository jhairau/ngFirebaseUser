angular.module('ngFirebaseUser')
    .directive('ngFirebaseUserLoginForm', ['ngFirebaseUserConfig', 'ngFirebaseUserUser', function (ngFirebaseUserConfig, ngFirebaseUserUser) {
        return {
            restrict: 'E',
            templateUrl: ngFirebaseUserConfig.get('templatePath') + '/login-form.html',
            link: function (scope) {

                // Add to scope
                angular.extend(scope, {
                    user: {
                        email: null,
                        password: null
                    },
                    loginStatus: null
                });

                /**
                 * Attempt to login the user
                 * @return {[type]} [description]
                 */
                scope.doLogin = function () {
                    ngFirebaseUserUser.loginEmail(scope.user.email, scope.user.password);
                };


                scope.$on('ngFirebaseUser:login_error', function (event, err) {
                    console.log(event, err);
                });

            }
        };
    }]);
