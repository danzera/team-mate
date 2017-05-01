myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  let allTeams = this;
  allTeams.userObject = UserService.userObject;
}]);
