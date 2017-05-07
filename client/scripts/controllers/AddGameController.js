myApp.controller('AddGameController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let addGame = this;
  addGame.message = '';
  addGame.currentTeamObject = UserService.currentTeamObject;
  addGame.date = ''; // can't data bind and then use moment.js on the data-bound variable so need to data bind separately,
  addGame.time = ''; // ^ then convert using moment.js, then assign to the new gameObject with the addNewGame function
  addGame.newGame = {
    team_id: addGame.currentTeamObject.team_id,
    location: '',
    opponent: ''
  }

  // DATA-BINDING FUNCTIONS
  addGame.addNewGame = function(gameObject) {
    if (!addGame.date || !addGame.time || !gameObject.location) {  // game date, time and/or location is blank - alert user (OK for opponent to be blank)
          addGame.message = 'Date, Time and Location must be complete.';
        } else { // necessary input fields are complete
          addGame.message = ''; // reset error message to the empty string
          gameObject.date = addGame.date;
          gameObject.time = addGame.time;
          console.log('game to be added:', gameObject);
          console.log('game date:', gameObject.date);
          console.log('game time:', gameObject.time);
          UserService.adjustGameDateAndTime(gameObject);
          console.log('new game has been adjusted:', gameObject);
          //UserService.addNewGame(newGame).then(redirectToTeamSchedule); // send new game to the factory

          // let adjustedDate = moment(addGame.gameDate).format('YYYY-MM-DD');
          // let adjustedTime = moment(addGame.gameTime).format('HH:mm');
          // let newGame = new Game(undefined, teamId, adjustedDate, adjustedTime, addGame.location, addGame.opponent);
        }
  };

  let redirectToTeamSchedule = UserService.redirectToTeamSchedule;
  // let adjustGameDateAndTime = UserService.adjustGameDateAndTime;


}]);
