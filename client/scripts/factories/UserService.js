myApp.factory('UserService', ['$http', '$location', function($http, $location){
  // let userObject = new User(); // instantiate a new userObject on factory load
  let userObject = {
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    invitesArray: [],
    teamsArray: []
  };
  let currentTeamObject = {
    id: '',
    name: '',
    gamesArray: []
  };
  let playerStatusObject = new PlayerStatus(); // instantiate a new teamObject on factory load
  // let currentTeamObject = new Team(); // instantiate a new teamObject on factory load

  //--------AUTHENTICATION--------
  // login an existing user
  function loginUser(tempUser) {
    return $http.post('/', tempUser).then(function(response) {
      if (response.data.username) { // login successful
        userObject.username = response.data.username;
        if (response.data.first_name) {
          userObject.firstName = response.data.first_name;
        }
        if (response.data.last_name) {
          userObject.lastName = response.data.last_name;
        }
        if (response.data.phone) {
          userObject.phone = response.data.phone;
        }
        console.log('userObject after login:', userObject);
        return true; // logged in
      } else {
        return false; // failed login
      }
    });
  } // end login()

  // register a new user
  function registerUser(tempUser) {
    return $http.post('/register', tempUser);
  } // end registerUser()

  // verify user authentication
  function getUser() {
    $http.get('/user').then(function(response) {
      if (!response.data.username) {
        redirectToHome();
      }
    });
  } // end getUser()

  // logout the user
  function logout() {
    $http.get('/user/logout').then(function(response) {
      userObject.username = '';
      userObject.firstName = '';
      userObject.lastName = '';
      userObject.phone = '';
      teamsArray = [];
      // ----- 
      playerStatusObject.clear(); // wipe out the playerStatusObject
      currentTeamObject.clear(); // wipe out the currentTeamObject
      // ----- ^ OLD - UPDATE OR REMOVE DEPENDING ON THE OBJECTS THAT ARE CREATED
      redirectToHome();
    }); // end $http.get()
  } // end logout()
  //--------END AUTHENTICATION--------

  //-------'/invite' ROUTE----------
  // get user's team invites
  function getUsersInvites() {
    userObject.invitesArray = [];
    return $http.get('/invite').then(function(response) {
      let allInvites = response.data.rows;
      if (allInvites.length) {
        console.log('YAY INVITES:', allInvites);
        userObject.invitesArray = allInvites;
        console.log('userObject.invitesArray', userObject.invitesArray);
        return true;
      } else {
        console.log('NO INVITES');
        return false;
      }
    }); // end $http callback function
  } // end getUsersInvites()

  // accept an invitation to join a team (delete from invites table)
  function acceptInvite(teamId) {
    console.log('deleting invite for', userObject.username, 'from team', teamId);
    return $http.delete('/invite/' + teamId);
  }

  // --------'/teams' ROUTES--------
  // get users teams from the "teams" table in the database
  function getUsersTeams() {
    userObject.TeamsArray = [];
    return $http.get('/teams').then(function(response) {
      let allTeams = response.data.rows;
      if (allTeams.length) {
        console.log('YAY TEAMS:', allTeams);
        userObject.teamsArray = allTeams;
        console.log('userObject.teamsArray', userObject.teamsArray);
        return true;
      } else {
        return false;
      }
      // return allTeams;
    });
  }

  // add a player to the users_teams table
  function addPlayerToTeam(inviteObject) {
    console.log('adding player to team via inviteObject', inviteObject);
    return $http.post('/teams/add-player', inviteObject);
  } // end addPlayerToTeam()



  //----------REDIRECTS--------------
  function redirectToLogin() {
    $location.path('/login');
  }

  function redirectToAllTeams() {
    $location.path('/all-teams');
  }

  function redirectToTeamSchedule() {
    $location.path('/team-schedule');
  }

  function redirectToHome() {
    $location.path('/home');
  }
  //---------END REDIRECTS-----------



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
    return $http.post('/games', gameObject).then(function(response) {
      return response;
      // $location.path('/team-schedule'); // route the user back to the team schedule view
      // @TODO add all players on the team to new game in users_games table...may need a .then chain to do this...
      // addPlayersToGame(____?____); // SIMILAR TO ABOVE...add the team creator as a manager to the users_teams table
    });
  } // end addNewTeam()
  // --------END '/games' ROUTES--------
  

  // -------'/invite' ROUTE----------
  

  // post a player to the 'invites' table
  // @TODO TRIGGER E-MAIL SENT ON THIS ROUTE
  function invitePlayer(inviteObject) {
    console.log('invite in the factory', inviteObject);
    $http.post('/invite', inviteObject).then(function(response) {
      $location.path('/team-schedule'); // route the user back to the team schedule view
    });
  }


  // -------END '/invite' ROUTE------

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
    getUsersInvites,
    getUsersTeams,
    acceptInvite,
    addPlayerToTeam,
    redirectToLogin,
    redirectToTeamSchedule,
    redirectToAllTeams,
    playerStatusObject,
    loginUser,
    registerUser,
    getUser,
    logout,
    addNewTeam,
    addNewGame,
    getTeamsGames,
    invitePlayer
  };
}]);
