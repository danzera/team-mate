myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  let allTeams = this;
  allTeams.userObject = UserService.userObject;
  console.log('userObject in AllTeamsController', allTeams.userObject);
}]);
