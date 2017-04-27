myApp.factory('UserService', ['$http', '$location', function($http, $location){
  // instantiate a new userObject on factory load
  let userObject = new User();
  console.log('user instantiated in the factory:', userObject);
  // get user from the database
  function getUser() {
    $http.get('/user').then(function(response) {
        if (response.data.username) { // user has a curret session on the server
            // response.data === entire row from the users table in the DB
            // set the userObject's id === id from the server response
            userObject.setId(response.data.id);
            // set the userObject's email === username from the server response
            userObject.setEmail(response.data.username);
            // set userObject's human name (if one exists in the DB)
            if (response.data.first_name) {
              userObject.setFirstName(response.data.first_name);
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
  } // end getUser()

  // logout the user
  function logout() {
    $http.get('/user/logout').then(function(response) {
      console.log('user logged out - redirecting to /#/home');
      $location.path('/home');
    });
  } // end logout()

  // add new team to the database
  // posts a new team to the teams table
  // adds user to the users_teams table as a manager
  function postNewTeam(teamName) {
    console.log('adding new team in the factory:', teamName);
    $http.post('/teams', {teamName: teamName}).then(function(response) {
      console.log('back from the database with response:', response);
    });
  } // end postNewTeam

  // IF A REDIRECT IS NEEDED -- USE $location
  // NOT SURE IF A FUNCTION SPECIFICALLY FOR THE ACTION IS A GOOD THOUGHT
  // BUT DOES SEEM TO MAKE CODE MORE READABLE
  // NEED TO EXPORT IT IF IT'S TO BE USED BY CONTROLLERS
  // function redirectToLogin() {
  //   $location.path("/login");
  // }

  return {
    userObject,
    getUser,
    logout,
    postNewTeam
  };
}]);
