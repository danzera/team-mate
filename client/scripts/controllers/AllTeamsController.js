myApp.controller('AllTeamsController', ['$location', 'UserService', function($location, UserService) {
  let allTeams = this;
  allTeams.message = '';
  allTeams.hasInvites;
  allTeams.userObject = UserService.userObject;
  allTeams.playerStatusObject = UserService.playerStatusObject; // NEW
  allTeams.currentTeamObject = UserService.currentTeamObject;
  // allTeams.joinTeam = function(teamId, teamInfoObject) {
  //   console.log('joinging team', teamId, teamInfoObject);
  // } -- MAYBE WE'LL NEED A .THEN CHAIN?

  allTeams.joinTeam = function(teamId, teamInfoObject) {
    console.log('heading to the factory to join team', teamId, teamInfoObject);
    UserService.joinTeam(teamId, teamInfoObject, allTeams.userObject, allTeams.playerStatusObject);
    // allTeams.getUsersInvites();
    UserService.getUsersTeams(allTeams.userObject.getId()).then(function(teamsArray) {
      console.log('TEAMS ARRAY?', teamsArray);
      if (!teamsArray.length) {
        allTeams.message = 'You\'re not currently a member of any teams. Please join or create a new team.';
      } else {
        for (i = 0; i < teamsArray.length; i++) {
          let teamId = teamsArray[i].team_id;
          let teamName = teamsArray[i].name;
          let hasJoined = teamsArray[i].joined;
          console.log('team', teamName, 'joined', hasJoined);
          let isManager = teamsArray[i].manager;
          allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
          allTeams.playerStatusObject.addTeamStatus(teamId, teamName, hasJoined, isManager);
        }
      }
    });
  }
  
  allTeams.goToTeamSchedule = function(teamId, teamInfoObject) {
    allTeams.currentTeamObject.clear();
    allTeams.currentTeamObject.setId(teamId);
    allTeams.currentTeamObject.setName(teamInfoObject.teamName);
    $location.path('/team-schedule');
  };

  // GET THE USER'S INVITES WHEN THE CONTROLLER LOADS
  UserService.getUsersInvites(allTeams.userObject.getUsername()).then(function(hasInvites) {
    console.log('got back from invites:', hasInvites);
    console.log('player status object is now...', allTeams.playerStatusObject);
    if (hasInvites) {
      allTeams.hasInvites = hasInvites;
    } else {
      allTeams.hasInvites = false;
    }
  });

  // GET THE USER'S TEAMS WHEN THE CONTROLLER LOADS
  UserService.getUsersTeams(allTeams.userObject.getId()).then(function(teamsArray) {
    if (!teamsArray.length) {
      allTeams.message = 'You\'re not currently a member of any teams. Please join or create a new team.';
    } else {
      for (i = 0; i < teamsArray.length; i++) {
        let teamId = teamsArray[i].team_id;
        let teamName = teamsArray[i].name;
        let hasJoined = teamsArray[i].joined;
        console.log('team', teamName, 'joined', hasJoined);
        let isManager = teamsArray[i].manager;
        allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
        allTeams.playerStatusObject.addTeamStatus(teamId, teamName, hasJoined, isManager);
      }
    }
  }); // end allTeams.getUsersTeams
}]);