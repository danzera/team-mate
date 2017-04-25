myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
  let login = this; // reference to the controller
  login.message = '';
  login.user = {
    username: '',
    password: ''
  };
  login.userObject = UserService.userObject

  login.login = function() {
    if(login.user.username === '' || login.user.password === '') {
      login.message = "Enter your username and password!";
    } else {
      console.log('sending credentials to the server from LoginController.login()...', login.user);
      $http.post('/', login.user).then(function(response) {
        if(response.data.username) {
          console.log('successful login from LoginController.login(): ', response.data);
          // IS THIS WHEN THE FACTORY OBJECT SHOULD BE ALTERED???
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
        console.log('Happy Day - Success');
        $location.path('/home');
      },
      function(response) {
        console.log('Bad Luck - Error');
        login.message = "Please try again.";
      });
    }
  };
}]);
