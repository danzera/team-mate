myApp.factory('UserService', ['$http', '$location', function($http, $location){
  let userObject = new User(); // instantiate a new userObject on factory load
  let playerStatusObject = new PlayerStatus(); // instantiate a new teamObject on factory load
  let currentTeamObject = new Team(); // instantiate a new teamObject on factory load

  // --------AUTHENTICATION--------
  // login function for the LoginController
  function loginUser(tempUser) {
    return $http.post('/', tempUser).then(function(response) {
      if (response.data.username) { // login successful
        userObject.setId(response.data.id);
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
      userObject.clear(); // wipe out the userObject
      playerStatusObject.clear(); // wipe out the playerStatusObject
      currentTeamObject.clear(); // wipe out the currentTeamObject
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
    currentTeamObject.setName(teamName); // set current team's name
    currentTeamObject.setCreatorId(userObject.getId()); // set current team creator ID
    $http.post('/teams', currentTeamObject).then(function(response) {
      let newTeamId = response.data.rows[0].id; // DB returns the ID of the team that was created
      currentTeamObject.setId(newTeamId); // set current team's ID
      playerStatusObject.addTeamStatus(newTeamId, teamName, true, true);
      addPlayerToTeam(newTeamId, userObject.getId(), playerStatusObject); // add the team creator as a manager to the users_teams table
      $location.path('/all-teams');
      // WILL NEED TO ADD THE MANAGER TO THE TEAM'S GAMES HERE WHEN STATUS ASSIGNEMENTS ARE INPUT
    });
  } // end addNewTeam()

  // add a player to the users_teams table
  function addPlayerToTeam(teamId, userId, playerStatusObject) {
    $http.post('/teams/add-player/' + teamId + '/' + userId, playerStatusObject).then(function(response) {
      console.log('PLAYER ADDED!');
      //$location.path('/team-schedule'); // redirect user to the newly created team's schedule screen
    });
  } // end addPlayerToTeam()
  // --------END '/teams' ROUTES--------

  // --------'/games' ROUTES--------  
  // get all of the games for a team by teamId
  function getTeamsGames(teamId) {
    return $http.get('/games/' + teamId).then(function(response) {
      let gamesArray = response.data.rows;
      return gamesArray;
    });
  } // end getUsersTeams()

  // post new game to the "games" table & add the team's players to the "users_games" table
  function addNewGame(gameObject) {
    $http.post('/games', gameObject).then(function(response) {
      $location.path('/team-schedule'); // route the user back to the team schedule view
      // @TODO add all players on the team to new game in users_games table...may need a .then chain to do this...
      // addPlayersToGame(____?____); // SIMILAR TO ABOVE...add the team creator as a manager to the users_teams table
    });
  } // end addNewTeam()
  // --------END '/games' ROUTES--------

  // -------'/invite' ROUTE----------
  //
  function getUsersInvites(username) {
     return $http.get('/invite/' + username).then(function(response) {
      // return $http.get('/invites/' + username).then(function(response) {
      let allTeamInvites = response.data.rows;
      if (allTeamInvites.length > 0) {
        for (i = 0; i < allTeamInvites.length; i++) {
          let teamId = allTeamInvites[i].team_id;
          let teamName = allTeamInvites[i].name;
          let isManager = allTeamInvites[i].manager;
          playerStatusObject.addTeamStatus(teamId, teamName, false, isManager);
        }
        return true;
      } else {
        return false;
      }
    }); // end $http callback function
  } // end getUsersInvites()

  // post a player to the 'invites' table
  // @TODO TRIGGER E-MAIL SENT ON THIS ROUTE
  function invitePlayer(inviteObject) {
    console.log('invite in the factory', inviteObject);
    $http.post('/invite', inviteObject).then(function(response) {
      $location.path('/team-schedule'); // route the user back to the team schedule view
    });
  }

  function deleteInvite(teamId, username) {
    console.log('deleting invite for', username, 'from team', teamId);
    $http.delete('/invite/' + teamId + '/' + username).then(function() {
      console.log('invite deleted!');
    });
  }
  // -------END '/invite' ROUTE------

  // -----other functions/multi-routes-----
  function joinTeam(teamId, teamInfoObject, userObject, playerStatusObject) {
    playerStatusObject.setHasJoinedStatus(teamId, true); // change user's "hasJoined" status to true for the specified team
    addPlayerToTeam(teamId, userObject.getId(), playerStatusObject); // add player to the "users_teams" table in the database
    deleteInvite(teamId, userObject.getUsername());
    console.log('playerStatusObject after factory magic', playerStatusObject);
  }
  // ---end other functions/multi-routes---

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
    playerStatusObject,
    currentTeamObject,
    loginUser,
    getUser,
    logout,
    addNewTeam,
    addNewGame,
    getUsersTeams,
    getTeamsGames,
    invitePlayer,
    getUsersInvites,
    joinTeam
  };
}]);
