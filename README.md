# ngFirebaseUser
Angular Module for Firebase 1.1+ authentication &amp; user management for Ionic and Bootstrap

Not ready for use for requests yet
## TODO

### Config
Allow the developer to override paths in Firebase

### Directives
- Ionic
    - User Login
    - User Register
- Bootstrap 3
    - User Login
    - User Register
    - User List & Management
    - Admin Register User

### Services
- User
    - Auth 
	    - Login
	        - Email
	        - Facebook
	        - Twitter
	        - Google
	        - Github
	    - Logout
	- Load / Edit
- Admin
	- Create (Email Based User)
    - Send Password Reset
    - Suspend
    - Delete



### Events
- User Logged In
- User Logged Out
- User Login Error

- User Created
- User Created Error
- User Loaded
- User Updated

## Credit
Inspired by the work over at https://github.com/Jon-Biz/FireUser

    .config(function(FirebaseUserConfigProvider) {
    
        ngFirebaseUserConfigProvider.setConfig({
            'firebaseUrl': 'https://arterial-blood-gas.firebaseio.com'
        });
    })
    ...