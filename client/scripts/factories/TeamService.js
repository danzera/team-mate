myApp.factory('TeamService', ['$http', '$location', function($http, $location){
  console.log('Meow - TeamService loaded');
  class User {
    constructor(username) {
      this.username = username;
    }

    getUsername() {
      return this.username;
    }

    setUsername(username) {
      this.username = username;
    }
  }
  // instantiate a new userObject
  let userObject = new User('');
  // get user from the database
  function getUser() {
    $http.get('/user').then(function(response) {
        if (response.data.username) {
            // user has a curret session on the server
            userObject.setUsername(response.data.username);
            console.log('Meow - User Data: ', userObject.getUsername());
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    });
  }

  function logout() {
    $http.get('/user/logout').then(function(response) {
      console.log('Bark - logged out');
      $location.path("/home");
    });
  }

  return {
    userObject,
    getUser,
    logout
  };
}]);
