myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  let allTeams = this;
  allTeams.userObject = UserService.userObject;
  allTeams.viewTeam = UserService.viewTeam;

  // function (teamObject) {
  //   console.log('AllTeamsController teamObject clicked:', teamObject);
  //   allTeams.userObject.setCurrentTeamId(teamObject.getId());
  //   allTeams.userObject.setHasJoined(teamObject.getHasJoined());
  //   allTeams.userObject.setIsManager(teamObject.getIsManager());
  //   console.log('userObject after click:', allTeams.userObject);
  // }
}]);