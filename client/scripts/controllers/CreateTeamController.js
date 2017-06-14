angular
  .module('myApp')
  .controller('CreateTeamController', ['UserService', function(UserService) {
    // DATA-BINDING VARIABLES
    let vm = this; // controller reference
    vm.message = ''; 
    vm.currentTeamObject = UserService.currentTeamObject;
    vm.currentTeamObject.manager = true; // creator is a manager by default

    // DATA-BINDING FUNCTIONS
    vm.addNewTeam = function() {
      if (verifyUserInput()) {
        UserService.addNewTeam()
          .then(addPlayerToTeam)
          .then(getUsersTeams)
          .then(redirectToTeamSchedule); // send team name to the factory
      }
    };

    // CONTROLLER FUNCTIONS
    let redirectToTeamSchedule = UserService.redirectToTeamSchedule;
    let addPlayerToTeam = UserService.addPlayerToTeam;
    let getUsersTeams = UserService.getUsersTeams;
    function verifyUserInput() {
      if (!vm.currentTeamObject.name) { // team name input NOT complete
        vm.message = 'Please enter a name for your team.';
        return false;
      } else { // team name input complete
        vm.message = ''; // reset error message back to empty string
        return true;
      }
    }
}]);
