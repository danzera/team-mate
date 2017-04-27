myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  let login = this; // reference to the controller
  console.log('login controller instantiated:', login);
  login.message = '';
  // "whenever you would use and object, use a class"
  // does that apply here - this seems to be a temporary object
  // used only for authentication so I renamed it tempUser
  login.tempUser = {
    username: '',
    password: ''
  };
  // ng-click for login.html form
  login.login = function() {
    if(login.tempUser.username === '' || login.tempUser.password === '') {
      login.message = "Enter your username and password!";
    } else {
      console.log('sending credentials to the server from LoginController.login()...', login.user);
      // WHY IS THIS A POST CALL? SEE MONGO CODE
      $http.post('/', login.tempUser).then(function(response) {
        if(response.data.username) { // user authenticated
          console.log('successful login from LoginController.login(): ', response.data);
          // location works with SPA (ng-route)
          console.log('redirecting to user page from LoginController.login()');
          $location.path('/all-teams'); // take user to a their all-teams view
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
