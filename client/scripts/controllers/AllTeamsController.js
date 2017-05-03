myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  let allTeams = this;
  allTeams.message = '';
  allTeams.userObject = UserService.userObject;
  allTeams.getTeamsGames = UserService.getTeamsGames;
  UserService.getUsersTeams(allTeams.userObject.getId()).then(function(teamsArray) {
    console.log('got users teams...', allTeams);
    if (!teamsArray.length) {
      allTeams.message = 'You\'re not currently a member of any teams. Please create a new team.';
    } else {
      for (i = 0; i < teamsArray.length; i++) {
        let teamId = teamsArray[i].team_id;
        let teamName = teamsArray[i].name;
        let hasJoined = teamsArray[i].joined;
        let isManager = teamsArray[i].manager;
        console.log('AllTeamsController user:', allTeams.userObject);
        allTeams.userObject.addTeam(teamId, teamName, hasJoined, isManager);
      }
    }
  }); // end allTeams.getUsersTeams
}]);