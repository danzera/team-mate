myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  let allTeams = this;
  allTeams.userObject = UserService.userObject;
  allTeams.getTeamsGames = function(teamObject) {
    // UserService.currentTeamObject = teamObject; // assign the currentTeamObject to the team from the user's teamsArray
    UserService.getTeamsGames(teamObject);
  }
}]);