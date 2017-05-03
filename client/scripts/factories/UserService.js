myApp.factory('UserService', ['$http', '$location', function($http, $location){
  let userObject = new User(); // instantiate a new userObject on factory load
  let currentTeamObject = new Team(); // instantiate a new teamObject on factory load

  // --------AUTHENTICATION--------
  // login function for the LoginController
  function loginUser(tempUser) {
    return $http.post('/', tempUser).then(function(response) {
      if (response.data.username) { // login successful
        userObject.setId(response.data.id);
        // TRYING TO RUN THE NEXT LINE UPON view CHANGE 
        // getUsersTeams(); // get the users teams from the database
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
        userObject.setUsername(response.data.username);
      } else { // user has no session on the server
        $location.path('/home'); // redirect them to the homepage
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
  function getUsersTeams(userId) {
    return $http.get('/teams/' + userId).then(function(response) {
      let allTeams = response.data.rows;
      return allTeams;
    });
  }

  // post new team to the "teams" table & add user as a manager to the "users_teams" table
  function addNewTeam(teamName) {
    // could use a tempTeam object in the controller and send that to this function, then set currentTeam in the callback
    // BUT this works for now
    currentTeamObject.setName(teamName);
    currentTeamObject.setCreatorId(userObject.getId()); // set team creator ID
    $http.post('/teams', currentTeamObject).then(function(response) {
      let newTeamId = response.data.rows[0].id; // DB returns the ID of the team that was created
      currentTeamObject.setId(newTeamId); // set the team's ID that was returned from the DB
      userObject.addTeam(currentTeamObject);
      userObject.setCurrentTeamId(newTeamId); // set ID of the current team the user is viewing
      userObject.setHasJoined(true); // user joins the current team by default (since they created the team)
      userObject.setIsManager(true); // user is a manager by default (since they created the team) -- can be changed later
      addPlayerToTeam(userObject); // add the team creator as a manager to the users_teams table
    });
  } // end addNewTeam()

  // add a player to the users_teams table
  function addPlayerToTeam(userObject) {
    $http.post('/teams/add-player', userObject).then(function(response) {
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
      // @TODO retreive all the team's games from the DB -- maybe the push on the next line is enough?
      currentTeamObject.addGame(gameObject); // add the new game to the current team's games
      $location.path('/team-schedule'); // route the user back to the team schedule view
      // @TODO display all of the team's games on the team schedule view with the newly added game
      // @TODO add the new game and all of the team's players to the users_games table
      // addPlayersToGame(____?____); // SIMILAR TO ABOVE...add the team creator as a manager to the users_teams table
      
    });
  } // end addNewTeam()
  
  // get all of the teams a user is associated with from the database
  // user may be associated with only one team, or multiple
  function getTeamsGames(teamId) {
    console.log('teamObject in the getTeamsGames function:', teamId);
    // NEED TO PASS ID OF TEAM THROUGH TO THIS FUNCTION
    // DON'T THINK THERE'S A WAY TO REFERENCE THE ID IF WE'RE STORING THE OBJECTS
    // AS DYNAMIC KEYS UNLESS THERE'S A WAY...MAYBE THERE IS...
    // let teamId = teamObject.teamId;
    // let teamName = teamObject.teamName;
    // currentTeamObject.setId(teamId);
    // currentTeamObject.setName(teamName);
    // retrieve current team's games from the DB
    return $http.get('/games/' + teamId).then(function(response) {
      let gamesArray = response.data.rows;
      return gamesArray;
      // currentTeamObject.setGamesArray(gamesArray);
      // $location.path('/team-schedule');
    });
  } // end getUsersTeams()
  // --------END '/games' ROUTES--------

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
    currentTeamObject,
    loginUser, // function for LoginController
    getUser,
    logout,
    addNewTeam,
    addNewGame,
    getUsersTeams,
    getTeamsGames
  };
}]);
