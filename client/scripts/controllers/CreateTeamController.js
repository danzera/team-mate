myApp.controller('CreateTeamController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let createTeam = this; // controller reference
  createTeam.message = ''; 
  createTeam.currentTeamObject = UserService.currentTeamObject;
  createTeam.currentTeamObject.manager = true; // creator is a manager by default

  // DATA-BINDING FUNCTIONS
  createTeam.addNewTeam = function() {
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
    if (!createTeam.currentTeamObject.name) { // team name input NOT complete
      createTeam.message = 'Please enter a name for your team.';
      return false;
    } else { // team name input complete
      createTeam.message = ''; // reset error message back to empty string
      return true
    }
  }
}]);
