myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  let allTeams = this;
  allTeams.userObject = UserService.userObject;
  console.log('users teams in AllTeamsController', allTeams.userObject.getTeamsArray());
}]);
