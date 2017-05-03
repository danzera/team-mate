myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  let teamSchedule = this; // reference to the controller
  teamSchedule.userObject = UserService.userObject;
  console.log('TeamScheduleController loaded with team', teamSchedule.userObject);
  teamSchedule.currentTeamObject = UserService.currentTeamObject;
  console.log('TeamScheduleController loaded with team', teamSchedule.currentTeamObject);
  UserService.getTeamsGames(teamSchedule.currentTeamObject.getId()).then(function(response) {
    console.log('got all the teams games...', response);
    // if (!teamsArray.length) {
    //   allTeams.message = 'You\'re not currently a member of any teams. Please create a new team.';
    // } else {
    //   for (i = 0; i < teamsArray.length; i++) {
    //     let teamId = teamsArray[i].team_id;
    //     let teamName = teamsArray[i].name;
    //     let hasJoined = teamsArray[i].joined;
    //     let isManager = teamsArray[i].manager;
    //     console.log('AllTeamsController user:', allTeams.userObject);
    //     allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
    //   }
    // }
  }); // end allTeams.getUsersTeams
}]);
