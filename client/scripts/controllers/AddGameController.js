myApp.controller('AddGameController', ['UserService', function(UserService) {
  let addGame = this;
  let redirectToTeamSchedule = UserService.redirectToTeamSchedule;
  addGame.currentTeamObject = UserService.currentTeamObject;
  addGame.errorMessage = '';
  addGame.gameDate = '';
  addGame.gameTime = '';
  addGame.location = '';
  addGame.opponent = '';

  addGame.addNewGame = function() {
    if (!addGame.gameDate || !addGame.gameTime || addGame.location === '') {  // game date, time and/or location is blank - alert user (OK for opponent to be blank)
          addGame.errorMessage = 'Date, Time and Location must be complete.';
        } else { // necessary input fields are complete
          addGame.errorMessage = ''; // reset error message to the empty string
          let teamId = UserService.currentTeamObject.getId();
          let adjustedDate = moment(addGame.gameDate).format('YYYY-MM-DD');
          let adjustedTime = moment(addGame.gameTime).format('HH:mm');
          let newGame = new Game(undefined, teamId, adjustedDate, adjustedTime, addGame.location, addGame.opponent);
          UserService.addNewGame(newGame).then(redirectToTeamSchedule); // send new game to the factory
        }
  };


}]);
