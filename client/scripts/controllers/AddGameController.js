myApp.controller('AddGameController', ['UserService', function(UserService) {
  let addGame = this;
  addGame.errorMessage = '';
  addGame.teamObject = UserService.teamObject;
}]);
