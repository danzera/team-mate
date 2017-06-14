angular
  .module('myApp')
  .controller('AddGameController', ['UserService', function(UserService) {
    // DATA-BINDING VARIABLES
    let vm = this;
    vm.message = '';
    vm.currentTeamObject = UserService.currentTeamObject;
    vm.date = ''; // can't data bind and then use moment.js on the data-bound variable so need to data bind separately,
    vm.time = ''; // ^ then convert using moment.js, then assign to the new gameObject with the addNewGame function
    vm.newGame = {
      team_id: vm.currentTeamObject.team_id,
      location: '',
      opponent: ''
    }

    // DATA-BINDING FUNCTIONS
    vm.addNewGame = function(gameObject) {
      if (verifUserInputs()) {
        gameObject.date = vm.date;
        gameObject.time = vm.time;
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
      if (!vm.date || !vm.time || !vm.newGame.location) {
        vm.message = 'Date, Time and Location must be complete.';
        return false;
      } else {
        vm.message = ''; // reset error message to the empty string
        return true;
      }
    }
}]); // END CONTROLLER
