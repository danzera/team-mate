myApp.controller('AllTeamsController', ['$location', 'UserService', function($location, UserService) {
  let allTeams = this;
  allTeams.message = '';
  allTeams.userObject = UserService.userObject;
  allTeams.playerStatusObject = UserService.playerStatusObject; // NEW
  allTeams.currentTeamObject = UserService.currentTeamObject;
  allTeams.goToTeamSchedule = function(teamId, teamInfoObject) {
    allTeams.currentTeamObject.clear();
    allTeams.currentTeamObject.setId(teamId);
    allTeams.currentTeamObject.setName(teamInfoObject.teamName);
    console.log('current team OBJ', allTeams.currentTeamObject);
    console.log('moving from all-teams to team-schedule');
    $location.path('/team-schedule');
  };

  // GET THE USER'S TEAMS WHEN THE CONTROLLER LOADS
  UserService.getUsersTeams(allTeams.userObject.getId()).then(function(teamsArray) {
    if (!teamsArray.length) {
      allTeams.message = 'You\'re not currently a member of any teams. Please create a new team.';
    } else {
      for (i = 0; i < teamsArray.length; i++) {
        let teamId = teamsArray[i].team_id;
        let teamName = teamsArray[i].name;
        let hasJoined = teamsArray[i].joined; // WILL WANT THIS ASSIGNMENT TO KEY OF THE invite_team_id ULTIMATELY, OK TO LEAVE FOR NOW, something like if (invite_team_id -- hasJoined = false)
        let isManager = teamsArray[i].manager;
        allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
        console.log('USER OBJECT', allTeams.userObject);
        allTeams.playerStatusObject.addTeamStatus(teamId, teamName, hasJoined, isManager); // NEW
        console.log('STATUS OBJECT', allTeams.playerStatusObject);
      }
    }
  }); // end allTeams.getUsersTeams
}]);