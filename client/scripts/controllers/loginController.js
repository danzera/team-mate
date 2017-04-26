myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  let login = this; // reference to the controller
  login.message = '';
  // this appears to be a temporary object used only for authentication purposes
  // should it be a 'new User()' that gets trashed once authenticted?
  // or should it tie to the factory object?
  login.user = {
    username: '',
    password: ''
  };
  login.userObject = UserService.userObject;

  login.login = function() {
    if(login.user.username === '' || login.user.password === '') {
      login.message = "Enter your username and password!";
    } else {
      console.log('sending credentials to the server from LoginController.login()...', login.user);
      // WHY IS THIS A POST CALL? SEE MONGO CODE
      $http.post('/', login.user).then(function(response) {
        if(response.data.username) { // user authenticated
          console.log('successful login from LoginController.login(): ', response.data);
          // update factory userObject information
          login.userObject.setEmail(response.data.username);
          // location works with SPA (ng-route)
          console.log('redirecting to user page from LoginController.login()');
          $location.path('/user');
        } else {
          console.log('failed to login from LoginController.login(): ', response);
          login.message = "Wrong!!";
        }
      });
    }
  };

  login.registerUser = function() {
    if(login.user.username === '' || login.user.password === '') {
      login.message = "Choose a username and password!";
    } else {
      console.log('One Moment - Sending credentials to the server...', login.user);
      $http.post('/register', login.user).then(function(response) {
        console.log('great success');
        alert('Success! You may now login.'); // MAY WANT TO REMOVE?
        $location.path('/login');
      },
      function(response) {
        console.log('server error - user already exists most likely (maybe there are additional things that would cause this)');
        login.message = "Oops! Something went wrong. Please try again.";
      });
    }
  };
}]);
