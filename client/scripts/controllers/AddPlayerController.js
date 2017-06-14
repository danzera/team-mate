angular
  .module('myApp')
  .controller('AddPlayerController', ['UserService', function(UserService) {
    // DATA-BINDING VARIABLES
    let vm = this;
    vm.message = '';
    vm.currentTeamObject = UserService.currentTeamObject;
    vm.newInvite = {
      team_id: vm.currentTeamObject.team_id,
      teamName: vm.currentTeamObject.name,
      email: '',
      manager: false // hard coding false for now, would like to add option for adding
    };

    // DATA-BINDING FUNCTIONS
    vm.invitePlayer = function() {
      if (verifUserInputs()) {
        UserService.invitePlayer(vm.newInvite)
          .then(redirectToTeamSchedule);
      }
    };

    // CONTROLLER FUNCTIONS
    let redirectToTeamSchedule = UserService.redirectToTeamSchedule;
    function verifUserInputs() {
      if (!vm.newInvite.email) {
        vm.message = 'Please enter an email address for the player you want to add.';
        return false;
      } else {
        vm.message = '';
        return true;
      }
    }
}]);