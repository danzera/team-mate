myApp.factory('UserService', ['$http', '$location', function($http, $location){
  // instantiate a new userObject
  let userObject = new User();
  console.log('initial userObject in the factory:', userObject);
  // get user from the database
  function getUser() {
    $http.get('/user').then(function(response) {
        if (response.data.username) { // user has a curret session on the server
            // response.data === entire row from the users table in the DB
            // set the userObject's id === id from the server response
            userObject.setId(response.data.id);
            // set the userObject's email === username from the server response
            userObject.setEmail(response.data.username);
            // set userObject's name (if one exists in the DB)
            if (response.data.name) {
              userObject.setName(response.data.name);
            }
            // set userObject's phone (if one exists in the DB)
            if (response.data.phone) {
              userObject.setPhone(response.data.phone);
            }
            console.log('retrieved user info in factory: ', userObject);
        } else { // user has no session on the server
            // bounce them back to the login page
            $location.path("/home"); // WILL WANT TO CHANGE THIS TO TEAMS VIEW
        }
    });
  }

  function logout() {
    $http.get('/user/logout').then(function(response) {
      console.log('you logged out - see you next time');
      $location.path("/home");
    });
  }

  // function redirectToLogin() {
  //   $location.path("/login");
  // }

  return {
    userObject,
    getUser,
    logout
    // redirectToLogin
  };
}]);
