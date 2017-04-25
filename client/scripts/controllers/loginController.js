myApp.controller('LoginController', ['$scope', '$http', '$location', 'TeamService', function($scope, $http, $location, TeamService) {
  console.log('I Say - LoginController loaded');
  let login = this; // reference to the controller
  login.user = {
    username: '',
    password: ''
  };
  login.message = '';

  login.login = function() {
    if(login.user.username === '' || login.user.password === '') {
      login.message = "Enter your username and password!";
    } else {
      console.log('Har-Har - Sending credentials to the server...', login.user);
      $http.post('/', login.user).then(function(response) {
        if(response.data.username) {
          console.log('Huzzah - Successful login: ', response.data);
          // location works with SPA (ng-route)
          console.log('Hold Please - Redirecting to user page');
          $location.path('/user');
        } else {
          console.log('Nope - Failure: ', response);
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
