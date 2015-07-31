/**
 * Angular Module for Firebase 1.1+ authentication & user management
 * @version v0.0.1 - 2015-07-31
 * @link https://github.com/jhairau/ngFirebaseUser
 * @author Johnathan Hair <johnathan.hair.au@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function ( window, angular, undefined ) {
angular.module('ngFirebaseUser', ['firebase', 'ui.router'])
    .provider('ngFirebaseUserConfig', ['$log', function ngFirebaseUserConfigProvider($log) {

        // The base configuration
        var baseConfig = {
            firebaseUrl: null, // The base url for the Firebase app
            firebaseUserPath: 'user', // The base path within Firebase where user data is stored
            firebaseDataPath: 'data', // The baee apth within Firebase where app data is stored
            redirectPath: '/', // The path to redirect the ng app to when user is not authed

            angularUserNamespace: 'user', // The namespace to use in rootScope for user data

            routing: false, // Whether the should route the user based on auth
            routeAccess: 'private',
            routeRedirect: 'login'
        };


        /**
         * Set the entire config by merging objects
         * @param {[type]} object [description]
         */
        this.setConfig = function(object) {
            angular.extend(baseConfig, object);
        };


        /**
         * Get the entire config object
         * @return {[type]} [description]
         */
        this.getConfig = function() {
            return baseConfig;
        };


        /**
         * Get a single config value based on key
         * @return {[type]} [description]
         */
        this.getConfigValue = function(key) {

            // key doesn't exist
            if (!baseConfig[key]) {
                $log.error('The key: ' + key + 'does not exist');
                return false;
            }

            return baseConfig[key];
        };


        /**
         * The required $get method
         * @return {[type]} [description]
         */
        this.$get = function() {

            return {
                get: getConfigValue
            };

        };

        return this;
    }])
    .run(['$rootScope', 'ngFirebaseUserUser', '$state', 'ngFirebaseUserConfig',
        function($rootScope, ngFirebaseUserUser, $state, ngFirebaseUserConfig) {

            if (ngFirebaseUserConfig.get('routing')) {
                var checked;

                // Run on before route changed
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                    // If not being routed to the same name
                    if (checked != toState.name) {
                        event.preventDefault();

                        // Wait for authentication information from Firebase
                        waitForAuth.then(function() {
                            if (toState[ngFirebaseUserConfig.get('routeAccess')] && !$rootScope[ngFirebaseUserConfig.get('dataLocation')].userInfo) {
                                $state.go(ngFirebaseUserConfig.get('routeRedirect'));
                            } else {
                                checked = toState.name;
                                $state.go(toState.name, toParams);
                            }
                        });

                    } else {
                        // clear the flag and don't prevent the default if the state change 
                        // was just triggered by this watch
                        checked = false;
                    }
                });

            } // if
        }
    ]);

angular.module('ngFirebaseUser')
	.service('ngFirebaseUserUser', function ngFirebaseUserUser($rootScope, $q, ngFirebaseUserConfig, $firebaseAuth, $firebaseObject) {

		var self = this;
		var unbindUser = null;


		/**
		 * Firebase reference for app
		 * @type {Firebase}
		 */
		var appRef = new Firebase(ngFirebaseUserConfig.get('firebaseUrl'));


		/**
		 * Firebase reference for the current user
		 * @type {[type]}
		 */
		var usersRef = appRef.child(ngFirebaseUserConfig.get('firebaseUserPath'));


		/**
		 * Firebase object for authorisation
		 * @type {[type]}
		 */
		var authObj = $firebaseAuth(appRef);



		//
		// --- Events ---- //
		//

		// Hash of events
		this.EVENTS = {
			USER_LOGIN_SUCCESS: 'ngFirebaseUser:login_success',
			USER_LOGIN_ERROR: 'ngFirebaseUser:login_error',
			USER_LOGOUT: 'ngFirebaseUser:logout',

			USER_CREATED_SUCCESS: 'ngFirebaseUser:user_created_success',
			USER_CREATED_ERROR: 'ngFirebaseUser:user_created_error',
			USER_UPDATED: 'ngFirebaseUser:user_updated',
			USER_LOADED_SUCCESS: 'ngFirebaseUser:user_loaded_success',
			USER_LOADED_ERROR: 'ngFirebaseUser:user_loaded_error'
		};


		// Trigger on Firebase authorisation events
		authObj.$onAuth(function(authData) {
			if (authData) {

				// Broadcast login success
				$rootScope.$broadcast(self.EVENTS.USER_LOGIN_SUCCESS);

				// Load the user
				self.loadUser(authData.uid);
			} else {

				// Broadcast logout success
				$rootScope.$broadcast(self.EVENTS.USER_LOGOUT);

				// Unbind the user object
				unbindUser();
			}
		});


		/**
		 * Private methodd to load the user
		 * @param  {[type]} uid [description]
		 * @return {[type]}     [description]
		 */
		var loadUser = function(uid) {
			var userObject = $firebaseObject(usersRef.child(uid));

			// Run when user is loaded
			userObject.$loaded()
				.then(function(data){
					// Broadcast user is loaded successfully
					$rootScope.$broadcast(self.EVENTS.USER_LOADED_SUCCESS);
				})
				.catch(function(err){
					// Broadcast user is not loaded successfully
					$rootScope.$broadcast(self.EVENTS.USER_LOADED_ERROR);	
				});
			
			// Bind the user data to the rootScope based on the config
			userObject.$bindTo($rootScope, ngFirebaseUserConfig.get('angularUserNamespace'))
				.then(function(unb) {
					unbindUser = unb;
				});
		};


		//
		// ---- Login Methods ---- //
		//
		
		/**
		 * Login a user via email and password, return promise
		 * @param  {[type]} email    [description]
		 * @param  {[type]} password [description]
		 * @return {[promise]}          [description]
		 */
		this.loginEmail = function(email, password) {
			var def = $q.defer();

			authObj.$authWithPassword({
				email: email,
				password: password
			}).then(function(authData){
				def.resolve(authData.uid); // return the user id
			}).catch(function(error) {
				def.reject(error); // return the error
				$rootScope.$broadcast(self.EVENTS.USER_LOGIN_ERROR); // broadcast the error
			});

			return def.promise;
		};


		/**
		 * Logout the current user from Firebase
		 *
		 * If successful it will trigger the event ngFirebaseUser:logout or
		 * ngFirebaseUser:logout_fail if error
		 * @return {void} [description]
		 */
		this.logout = function() {
			authObj.$unauth();

			return null;
		};


		//
		// ---- Managment ---- //
		//

		/**
		 * Change the password for the user requiring their email,
		 * old password and new password.
		 * 
		 * You should make sure that they write their new password twice
		 * so that they don't submit an incorrect password.
		 * 
		 * @param  {[type]} email       [description]
		 * @param  {[type]} oldPassword [description]
		 * @param  {[type]} newPassword [description]
		 * @return {[type]}             [description]
		 */
		this.changePassword = function(email, oldPassword, newPassword) {
			authObj.$changePassword({
				email: email,
				oldPassword: oldPassword,
				newPassword: newPassword
			}).then(function() {
				console.log("Password changed successfully!");
			}).catch(function(error) {
				console.error("Error: ", error);
			});
		};


		/**
		 * Request Firebase to send a password reset email to the specified email
		 * returns a promise
		 * @param  {[type]}   email    [description]
		 * @return {promise}            [description]
		 */
		this.sendPasswordResetEmail = function(email) {
			return authObj.$resetPassword({
				email: email
			});
		};


		/**
		 * Change the registered email address for the user
		 * @param  {[type]} oldEmail [description]
		 * @param  {[type]} newEmail [description]
		 * @param  {[type]} password [description]
		 * @return {[promise]}          [description]
		 */
		this.changeEmail = function(oldEmail, newEmail, password) {
			return authObj.$changeEmail({
				oldEmail: oldEmail,
				newEmail: newEmail,
				password: password
			});
		};


		// TODO: restrict to ADMIN
		/**
		 * Create a user
		 * @param  {[type]} email    [description]
		 * @param  {[type]} password [description]
		 * @return {[type]}          [description]
		 */
		this.createUser = function(email, password) {
			return authObj.$createUser({
				email: email,
				password: password
			});
		};



		//
		// --- Resolve methods for Controllers
		//


		/**
		 * Promise that returns the current auth state for the user
		 * @return {[type]} [description]
		 */
		this.waitForAuth = function() {
			return authObj.$waitForAuth();
		};


		/**
		 * Promise that rejects if user is not authed
		 * @return {[type]} [description]
		 */
		this.requireAuth = function() {
			return authObj.$requireAuth();
		};

		return this;
	});})( window, window.angular );