angular.module('ngFirebaseUser', ['firebase', 'ui.router'])
    .provider('ngFirebaseUserConfig', function ngFirebaseUserConfigProvider() {

        // The base configuration
        var baseConfig = {
            firebaseUrl: null, // The base url for the Firebase app
            firebaseUserPath: 'user', // The base path within Firebase where user data is stored
            firebaseDataPath: 'data', // The baee apth within Firebase where app data is stored

            redirectPathLoggedIn: null, // The path to redirect the user to when the are now authed (optional)
            redirectPathLoggedOut: null, // The path to redirect the ng app to when user is not authed
            angularUserNamespace: 'user', // The namespace to use in rootScope for user data

            routing: false, // Whether the should route the user based on auth
            routeAccess: 'private',
            routeRedirect: 'login',

            templatePath: 'templates/bootstrap3'
        };


        /**
         * Set the entire config by merging objects
         * @param {[type]} object [description]
         */
        this.setConfig = function (object) {
            angular.extend(baseConfig, object);
        };


        /**
         * Get the entire config object
         * @return {[type]} [description]
         */
        this.getConfig = function () {
            return baseConfig;
        };


        /**
         * Get a single config value based on key
         * @return {[type]} [description]
         */
        this.getConfigValue = function (key) {
            return baseConfig[key];
        };


        /**
         * The required $get method
         * @return {[type]} [description]
         */
        this.$get = function () {

            return {
                get: this.getConfigValue
            };

        };

        return this;
    })
    .run(['$rootScope', '$state', 'ngFirebaseUserConfig',
        function ($rootScope, $state, ngFirebaseUserConfig) {

            //
            // ---- ROUTING
            //
            if (ngFirebaseUserConfig.get('routing')) {

                // User has Logged in
                $rootScope.$on('ngFirebaseUser:login_success', function (event, authData) {
                    $rootScope.authData = authData;

                    if ($state.current.name == ngFirebaseUserConfig.get('redirectPathLoggedOut')) {
                        event.preventDefault();
                        $state.go(ngFirebaseUserConfig.get('redirectPathLoggedIn'));
                    }
                });

                // User has logged out
                $rootScope.$on('ngFirebaseUser:logout', function (event, authData) {
                    if ($state.current.name != ngFirebaseUserConfig.get('redirectPathLoggedOut')) {
                        event.preventDefault();
                        $state.go(ngFirebaseUserConfig.get('redirectPathLoggedOut'));
                    }
                });


                // Listen to routing errors
                $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, err) {

                    // Stop any other routing actions from running
                    event.preventDefault();

                    switch(err) {
                        case 'AUTH_REQUIRED':
                            // route the user to the login page
                            $state.go(ngFirebaseUserConfig.get('redirectPathLoggedOut'));
                            break;

                        case 'ANON_REQUIRED':
                            // route the user to the login page
                            $state.go(ngFirebaseUserConfig.get('redirectPathLoggedIn'));
                            break;

                        default:
                            break;
                    }

                });
            }
        }
    ]);
