myApp.controller('AddGameController', ['UserService', function(UserService) {
  let addGame = this;
  //addGame.newGame = new Game();
  addGame.teamId = UserService.teamObject.getId();
  //addGame.userObject = UserService.userObject;
  addGame.errorMessage = '';
  addGame.gameDate = '';
  addGame.gameTime = '';
  addGame.location = '';
  addGame.opponent = '';


  addGame.addNewGame = function() {
    console.log('creating game with time', addGame.gameTime);
    if (!addGame.gameDate ||
        !addGame.gameTime ||
        addGame.location === '') {  // game date, time and/or location is blank - alert user (OK for opponent to be blank)
          addGame.errorMessage = 'Date, Time and Location must be complete.';
        } else { // necessary input fields are complete
          addGame.errorMessage = ''; // reset error message to the empty string
          let adjustedDate = moment(addGame.gameDate).format('YYYY-MM-DD');
          let adjustedTime = moment(addGame.gameTime).format('HH:mm');
          let newGame = new Game(undefined, addGame.teamId, adjustedDate, adjustedTime, addGame.location, addGame.opponent);
          console.log('new game in AddGameController:', newGame);
          UserService.addNewGame(newGame); // send new game to the factory
        }
  };


  // THIS WORKS FOR CREATING MOMENTS, BUT MAY NOT BE THE MOST ACCURATE WAY TO DO SO
  // let tempDate = new moment('20170427', 'YYYYMMDD');
  // let tempTime = new moment('19:30');
  // console.log(tempTime);
  // addGame.newGame = new Game(1,2,tempDate,tempTime,'Taft Field 2','The Roys');
  // console.log(addGame.newGame);
}]);
