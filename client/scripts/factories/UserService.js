myApp.factory('UserService', ['$http', '$location', function($http, $location){
  // instantiate a new userObject on factory load
  let userObject = new User();
  console.log('user instantiated in the factory:', userObject);
  // instantiate a new currentTeamObject on factory load
  let currentTeamObject = new Team();
  console.log('team instantiated in the factory:', currentTeamObject);

  // --------AUTHENTICATION--------
  // get user from the database
  function getUser() {
    $http.get('/user').then(function(response) {
      if (response.data.username) { // user has a curret session on the server
        // response.data === entire row from the users table in the DB
        // users table "id"
        userObject.setId(response.data.id);
        // users table "username"
        userObject.setUsername(response.data.username);
        if (response.data.first_name) { // user has first_name stored in database
          userObject.setFirstName(response.data.first_name);
        }
        if (response.data.phone) { // user has phone number stored in database
          userObject.setPhone(response.data.phone);
        }
        console.log('retrieved user info in factory: ', userObject);
      } else { // user has no session on the server
        // bounce them back to the login page
        $location.path("/home");
      }
    }); // end $http.get()
  } // end getUser()

  // logout the user
  function logout() {
    $http.get('/user/logout').then(function(response) {
      console.log('user logged out, clearing userObject:', userObject);
      userObject.clear();
      console.log('userObject cleared:', userObject);
      console.log('redirecting to /#/home');
      $location.path('/home');
    }); // end $http.get()
  } // end logout()
  // --------END AUTHENTICATION--------

  // --------'/teams' ROUTES--------
  // get all of the teams a user is associated with from the database
  // user may be associated with only one team, or multiple
  function getUsersTeams(userId) {
    console.log('getting all teams in the factory for userId', userId);
    $http.get('/teams/' + userId).then(function(response) {
      console.log('back from DB in getUsersTeams with response:', response);
    });
  } // end getUsersTeams()

  // add new team to the database
  // posts a new team to the teams table
  // adds user to the users_teams table as a manager
  function postNewTeam(teamName) {
    currentTeamObject.setName(teamName);
    currentTeamObject.setCreatorId(userObject.getId());
    console.log('adding new team in the factory:', currentTeamObject);
    $http.post('/teams', currentTeamObject).then(function(response) {
      let newTeamId = response.data.rows[0].id;
      currentTeamObject.setId(newTeamId);
      userObject.setCurrentTeam(newTeamId);
      userObject.setHasJoined(true);
      userObject.setIsManager(true);
      console.log('team added to the database', currentTeamObject);
      console.log('manager status set', userObject);
      // add the team creator as a manager to the users_teams table
      addPlayer(userObject);
    });
  } // end postNewTeam()

  // add a player to the users_teams table
  function addPlayer(userObject) {
    console.log('adding player', userObject, 'to team', userObject.getCurrentTeam(), 'in the factory');
    $http.post('/teams/add-player', userObject).then(function(response) {
      console.log('back from DB in addPlayer with response:', response);
    });
  } // end addPlayer()

  // edit a team's information in the database
  function editTeamInfo(teamId) {
    console.log('editing team info in the factory for teamId', teamId);
    $http.put('/teams/' + teamId).then(function(response) {
      console.log('back from DB in editTeamInfo with response:', response);
    });
  } // end editTeamInfo()

  // delete a team from the database
  function deleteTeam(teamId) {
    console.log('deleting team in the factory, adios teamId', teamId);
    $http.delete('/teams/' + teamId).then(function(response) {
      console.log('back from DB in deleteTeam with response:', response);
    });
  } // end deleteTeam()
  // --------END '/teams' ROUTES--------

  // ---\/\/\/---ROUTE TESTING---\/\/\/---
  // getUsersTeams(123);
  // postNewTeam('cheese team');
  // editTeamInfo(456);
  // deleteTeam(789);
  // ==========END ROUTE TESTING=========

  // IF A REDIRECT IS NEEDED -- USE $location
  // NOT SURE IF A FUNCTION SPECIFICALLY FOR THE ACTION IS A GOOD THOUGHT
  // BUT DOES SEEM TO MAKE CODE MORE READABLE
  // NEED TO EXPORT IT IF IT'S TO BE USED BY CONTROLLERS
  // function redirectToLogin() {
  //   $location.path("/login");
  // }

  return {
    userObject,
    currentTeamObject,
    getUser,
    logout,
    getUsersTeams,
    postNewTeam,
    editTeamInfo,
    deleteTeam
  };
}]);
