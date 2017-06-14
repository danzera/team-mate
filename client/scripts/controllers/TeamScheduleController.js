angular
  .module('myApp')
  .controller('TeamScheduleController', ['UserService', function(UserService) {
    // DATA-BINDING VARIABLES
    let vm = this; // controller reference
    vm.message = ''; // message to display if team has no games on its schedule
    vm.userObject = UserService.userObject;
    vm.currentTeamObject = UserService.currentTeamObject;

    // CONTROLLER FUNCTIONS
    function verifyTeamHasGames(hasGames) {
      if(!hasGames && vm.currentTeamObject.manager) {
        vm.message = 'You\'re team does not currently have any games scheduled. Click "Add a Game!"';
      } else if (!hasGames) {
        vm.message = 'Your team does not currently have any games scheduled. Talk to your manager about getting some games scheduled, or create a new team of your own!';
      } else {
        vm.message = '';
      }
    }

    function refreshData() {
      UserService.getCurrentTeamsGames()
        .then(verifyTeamHasGames);
      // will want a promise chain to get player statuses also
    }

    // RUN AT CONTROLLER LOAD
    refreshData();
}]); // END CONTROLLER