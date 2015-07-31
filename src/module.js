angular.module('ngFirebaseUser', ['firebase', 'ui.router'])
	.provider('ngFirebaseUserConfig', ['$log', function ngFirebaseUserConfigProvider($log){

		// The base configuration
		var baseConfig = {
			firebaseUrl: null, // The base url for the Firebase app
			firebaseUserPath: 'user', // The base path within Firebase where user data is stored
			firebaseDataPath: 'data', // The baee apth within Firebase where app data is stored
			redirectPath:'/', // The path to redirect the ng app to when user is not authed
	  		
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
		          	};  
		        });        

		      } else {
		        // clear the flag and don't prevent the default if the state change 
		        // was just triggered by this watch
		        checked = false;
		      }
		    });

		  }; 
		}]);