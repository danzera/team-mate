myApp.factory('UserService', ['$http', '$location', function($http, $location){
  let userObject = new User(); // instantiate a new userObject on factory load
  let teamObject = new Team(); // instantiate a new teamObject on factory load

  // --------AUTHENTICATION--------
  // login function for the LoginController
  function loginUser(tempUser) {
    return $http.post('/', tempUser).then(function(response) {
      console.log('loginUser() response:', response.data);
      if (response.data.username) { // login successful
        userObject.setId(response.data.id);
        getUsersTeams(); // get the users teams from the database
        userObject.setUsername(response.data.username);
        if (response.data.first_name) { // user has "first_name" stored in database
          userObject.setFirstName(response.data.first_name);
        }
        if (response.data.last_name) { // user has "last_name" stored in database
          userObject.setLastName(response.data.last_name);
        }
        if (response.data.phone) { // user has "phone" stored in database
          userObject.setPhone(response.data.phone);
        }
      }
      return userObject; // username will be '' if login ussuccessful
    });
  } // end login()

  // get user from the database
  function getUser() {
    $http.get('/user').then(function(response) {
      if (response.data.username) {
        console.log('verified user info in the factory: ', userObject);
      } else { // user has no session on the server
        $location.path("/home"); // redirect them to the homepage
      }
    }); // end $http.get()
  } // end getUser()

  // logout the user
  function logout() {
    $http.get('/user/logout').then(function(response) {
      userObject.clear(); // wipe the userObject
      $location.path('/home'); // redirect them to the homepage
    }); // end $http.get()
  } // end logout()
  // --------END AUTHENTICATION--------

  // --------'/teams' ROUTES--------
  // get users teams from the "teams" table in the database
  function getUsersTeams() {
    let userId = userObject.getId();
    console.log('getting teams for userId', userId);
    $http.get('/teams/' + userId).then(function(response) {
      userObject.setTeamsArray(response.data.rows);
    });
  }

  // post new team to the "teams" table & add user as a manager to the "users_teams" table
  function addNewTeam(teamObject) {
    teamObject.setCreatorId(userObject.getId()); // set team creator ID
    $http.post('/teams', teamObject).then(function(response) {
      let newTeamId = response.data.rows[0].id; // DB returns the ID of the team that was created
      teamObject.setId(newTeamId); // set the team's ID that was returned from the DB
      userObject.setcurrentTeamId(newTeamId); // set ID of the current team the user is viewing
      userObject.setHasJoined(true); // user joins the current team by default (since they created the team)
      userObject.setIsManager(true); // user is a manager by default (since they created the team) -- can be changed later
      console.log('team added to the database', teamObject);
      console.log('manager status set', userObject);
      addPlayerToTeam(userObject); // add the team creator as a manager to the users_teams table
    });
  } // end addNewTeam()

  // add a player to the users_teams table
  function addPlayerToTeam(userObject) {
    console.log('adding player', userObject, 'to team', userObject.getcurrentTeamId(), 'in the factory');
    $http.post('/teams/add-player', userObject).then(function(response) {
      console.log('back from DB in addPlayerToTeam with response:', response);
      alert('Team created successfully! You may now add games to your team\'s schedule.');
      $location.path('/team-schedule'); // redirect user to the newly created team's schedule screen
    });
  } // end addPlayerToTeam()
  // --------END '/teams' ROUTES--------

  // --------'/games' ROUTES--------
  // post new game to the "games" table & add the team's players to the "users_games" table
  function addNewGame(gameObject) {
    $http.post('/games', gameObject).then(function(response) {
      let newGameId = response.data.rows[0].id; // DB returns the ID of the game that was created
      gameObject.setId(newGameId); // set the team's ID that was returned from the DB
      console.log('game added to the database', gameObject);
      // @TODO add the new game and all of the team's players to the users_games table
      // @TODO retreive all the team's games from the DB
      // @TODO route the user back to the team schedule view
      $location.path('/team-schedule');
      // @TODO display all of the team's games on the team schedule view with the newly added game
      // addPlayersToGame(____?____); // add the team creator as a manager to the users_teams table
    });
  } // end addNewTeam()
  
  // @TODO --ROUTE WORKING-- COME BACK TO THIS WHEN WE COME BACK TO THE TEAM-SCHEDULE BRANCH
  // get all of the teams a user is associated with from the database
  // user may be associated with only one team, or multiple
  // function getTeamsGames(teamId) {
  //   console.log('getTeamsGames in the factory for teamId', teamId);
  //   $http.get('/games/' + teamId).then(function(response) {
  //     let gamesArray = response.data.rows;
  //     console.log('back from DB in getTeamsGames with games:', gamesArray);
  //   });
  // } // end getUsersTeams()
  // --------END '/games' ROUTES--------


  // IF A REDIRECT IS NEEDED -- USE $location
  // NOT SURE IF A FUNCTION SPECIFICALLY FOR THE ACTION IS A GOOD THOUGHT
  // BUT DOES SEEM TO MAKE CODE MORE READABLE
  // NEED TO EXPORT IT IF IT'S TO BE USED BY CONTROLLERS
  // function redirectToLogin() {
  //   $location.path("/login");
  // }

  // -----CURRENTLY UNUSED ROUTES-----
  // NOT YET USED?
  // @TODO COME BACK WHEN WE GET BACK TO THE ALL-TEAMS SCREEN -- FOR USERS ON MULTIPLE TEAMS
  // get all of the teams a user is associated with from the database
  // user may be associated with only one team, or multiple
  // function getUsersTeams(userId) {
  //   console.log('getting all teams in the factory for userId', userId);
  //   $http.get('/teams/' + userId).then(function(response) {
  //     console.log('back from DB in getUsersTeams with response:', response);
  //   });
  // } // end getUsersTeams()

  // @TODO EDIT A TEAM
  // NOT YET USED?
  // edit a team's information in the database
  // function editTeamInfo(teamId) {
  //   console.log('editing team info in the factory for teamId', teamId);
  //   $http.put('/teams/' + teamId).then(function(response) {
  //     console.log('back from DB in editTeamInfo with response:', response);
  //   });
  // } // end editTeamInfo()
  //
  // @TODO DELETE A TEAM
  // // NOT YET USED?
  // // delete a team from the database
  // function deleteTeam(teamId) {
  //   console.log('deleting team in the factory, adios teamId', teamId);
  //   $http.delete('/teams/' + teamId).then(function(response) {
  //     console.log('back from DB in deleteTeam with response:', response);
  //   });
  // } // end deleteTeam()
  // -----END CURRENTLY UNUSED ROUTES-----

  return {
    userObject,
    teamObject,
    loginUser, // function for LoginController
    getUser,
    logout,
    addNewTeam,
    addNewGame,
    getUsersTeams
  };
}]);
