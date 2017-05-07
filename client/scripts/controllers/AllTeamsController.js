myApp.controller('AllTeamsController', ['$location', 'UserService', function($location, UserService) {
  // DATA-BINDING VARIABLES
  let allTeams = this; // controller reference
  allTeams.message = ''; // used for error handling
  allTeams.userObject = UserService.userObject;
  
  allTeams.acceptInvite = function(teamId) {
    console.log('user wants to join team:', teamId);
    UserService.acceptInvite(teamId).then(refreshData);
  };
 
  
  //allTeams.playerStatusObject = UserService.playerStatusObject;
  //allTeams.currentTeamObject = UserService.currentTeamObject;
  // allTeams.joinTeam = function(teamId, teamInfoObject) {
  //   console.log('joinging team', teamId, teamInfoObject);
  // } -- MAYBE WE'LL NEED A .THEN CHAIN?

  // allTeams.joinTeam = function(teamId, teamInfoObject) {
  //   allTeams.message = '';
  //   allTeams.playerStatusObject.setHasJoinedStatus(teamId, true); // change user's "hasJoined" status to true for the specified team
  //   allTeams.hasTeams = true;
  //   allTeams.hasInvites = false;
  //   for (let teamInfoObject of allTeams.playerStatusObject) {
  //     if (!teamInfoObject.hasJoined) {
  //       allTeams.hasInvites = true;
  //     }
  //   }
  //   UserService.joinTeam(teamId, teamInfoObject, allTeams.userObject, allTeams.playerStatusObject);
  // }
  
  allTeams.goToTeamSchedule = function(teamId, teamInfoObject) {
    allTeams.currentTeamObject.clear();
    allTeams.currentTeamObject.setId(teamId);
    allTeams.currentTeamObject.setName(teamInfoObject.teamName);
    $location.path('/team-schedule');
  };


  // GET THE USER'S INVITES WHEN THE CONTROLLER LOADS
  // UserService.getUsersInvites(allTeams.userObject.getUsername()).then(function(hasInvites) {
  //   console.log('got back from invites:', hasInvites);
  //   console.log('player status object is now...', allTeams.playerStatusObject);
  //   if (hasInvites) {
  //     allTeams.hasInvites = hasInvites;
  //   } else {
  //     allTeams.hasInvites = false;
  //   }
  // });
  
  

  // GET THE USER'S TEAMS WHEN THE CONTROLLER LOADS
  // UserService.getUsersTeams(allTeams.userObject.getId()).then(function(teamsArray) {
  //   if (!teamsArray.length) {
  //     allTeams.hasTeams = false;
  //     allTeams.message = 'You\'re not currently a member of any teams. Please join or create a new team.';
  //   } else {
  //     allTeams.hasTeams = true;
  //     for (i = 0; i < teamsArray.length; i++) {
  //       let teamId = teamsArray[i].team_id;
  //       let teamName = teamsArray[i].name;
  //       let hasJoined = teamsArray[i].joined;
  //       console.log('team', teamName, 'joined', hasJoined);
  //       let isManager = teamsArray[i].manager;
  //       allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
  //       allTeams.playerStatusObject.addTeamStatus(teamId, teamName, hasJoined, isManager);
  //     }
  //   }
  // }); // end allTeams.getUsersTeams

  // CONTROLLER VARIABLES/FUNCTIONS
  let getUsersInvites = UserService.getUsersInvites;
  let getUsersTeams = UserService.getUsersTeams;

  function verifyUserHasTeams(hasTeams) { // set message to display if user is not a member of a team yet
    if(!hasTeams) {
      allTeams.message = 'You\'re not currently a member of any teams. Please join or create a new team.';
    } else {
      allTeams.message = '';
    }
  }

  function refreshData() {
    getUsersInvites().then(getUsersTeams).then(verifyUserHasTeams);
  }
  // RUN AT PAGE LOAD
  refreshData();
}]);