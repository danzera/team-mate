myApp.controller('AddGameController', ['UserService', function(UserService) {
  let addGame = this;
  let tempDate = new moment('20170427', 'YYYYMMDD');
  let tempTime = new moment('19:30');
  console.log(tempTime);
  addGame.newGame = new Game(1,2,tempDate,tempTime,'Taft Field 2','The Roys');
  console.log(addGame.newGame);
  addGame.errorMessage = '';
  addGame.teamObject = UserService.teamObject;
}]);
