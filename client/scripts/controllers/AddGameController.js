myApp.controller('AddGameController', ['UserService', function(UserService) {
  let addGame = this;
  addGame.newGame = new Game();
  addGame.errorMessage = '';
  addGame.teamObject = UserService.teamObject;
  addGame.userObject = UserService.userObject;
  addGame.addNewGame = function() {
    console.log('game created', addGame.newGame.getGameTime());
    if (addGame.newGame.getGameDate() === '' ||
        addGame.newGame.getGameTime() === '' ||
        addGame.newGame.getLocation() === '') {  // game date, time and/or location is blank - alert user
          addGame.errorMessage = 'Date, Time and Location must be complete.';
        } else { // necessary input fields are complete
          addGame.errorMessage = ''; // reset error message to the empty string
          console.log('game created', addGame.newGame);
        }
  };


  // THIS WORKS FOR CREATING MOMENTS, BUT MAY NOT BE THE MOST ACCURATE WAY TO DO SO
  // let tempDate = new moment('20170427', 'YYYYMMDD');
  // let tempTime = new moment('19:30');
  // console.log(tempTime);
  // addGame.newGame = new Game(1,2,tempDate,tempTime,'Taft Field 2','The Roys');
  // console.log(addGame.newGame);
}]);
