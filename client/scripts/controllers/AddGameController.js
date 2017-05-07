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
    if (verifUserInputs()) {
      gameObject.date = addGame.date;
      gameObject.time = addGame.time;
      UserService.adjustGameDateAndTime(gameObject); // convert date/time with moment.js
      UserService.addNewGame(gameObject)
        .then(redirectToTeamSchedule); // send new game to the factory

        // @TODO add all players on the team to new game in users_games table
        // should probably be in the .then chain immediately above
        // before the .then(redirectToTeamSchedule)
    }
  };

  // CONTROLLER FUNCTIONS
  let redirectToTeamSchedule = UserService.redirectToTeamSchedule;
  function verifUserInputs() {
    if (!addGame.date || !addGame.time || !addGame.newGame.location) {
      addGame.message = 'Date, Time and Location must be complete.';
      return false;
    } else {
      addGame.message = ''; // reset error message to the empty string
      return true;
    }
  }
  
}]); // END CONTROLLER
