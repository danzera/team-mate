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
    UserService.joinTeam(teamId, teamInfoObject);
  }
  
  allTeams.goToTeamSchedule = function(teamId, teamInfoObject) {
    allTeams.currentTeamObject.clear();
    allTeams.currentTeamObject.setId(teamId);
    allTeams.currentTeamObject.setName(teamInfoObject.teamName);
    $location.path('/team-schedule');
  };

  // GET THE USER'S INVITES WHEN THE CONTROLLER LOADS
  UserService.getUsersInvites(allTeams.userObject.getUsername()).then(function(hasInvites) {
    if (hasInvites) {
      allTeams.hasInvites = hasInvites;
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
        let isManager = teamsArray[i].manager;
        allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
        allTeams.playerStatusObject.addTeamStatus(teamId, teamName, hasJoined, isManager);
      }
    }
  }); // end allTeams.getUsersTeams
}]);