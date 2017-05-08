myApp.controller('AddPlayerController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let addPlayer = this;
  addPlayer.message = '';
  addPlayer.currentTeamObject = UserService.currentTeamObject;
  addPlayer.newInvite = {
    team_id: addPlayer.currentTeamObject.team_id,
    teamName: addPlayer.currentTeamObject.name,
    email: '',
    manager: false // hard coding false for now, would like to add option for adding
  };

  // DATA-BINDING FUNCTIONS
  addPlayer.invitePlayer = function() {
    if (verifUserInputs()) {
      UserService.invitePlayer(addPlayer.newInvite)
        .then(redirectToTeamSchedule);
    }
  };

  // CONTROLLER FUNCTIONS
  let redirectToTeamSchedule = UserService.redirectToTeamSchedule;
  function verifUserInputs() {
    if (!addPlayer.newInvite.email) {
      addPlayer.message = 'Please enter an email address for the player you want to add.';
      return false;
    } else {
      addPlayer.message = '';
      return true;
    }
  }
}]);