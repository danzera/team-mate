myApp.controller('CreateTeamController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let createTeam = this; // controller reference
  createTeam.message = ''; 
  createTeam.teamName = '';
  createTeam.currentTeamObject = UserService.currentTeamObject;

  // DATA-BINDING FUNCTIONS
  createTeam.addNewTeam = function(teamName) {
    if (teamName === '') {
      createTeam.message = 'Please enter a name for your team.';
    } else {
      createTeam.errorMessage = ''; // set error message back to empty string
      createTeam.currentTeamObject.name = teamName;
      createTeam.currentTeamObject.isManager = true;
      UserService.addNewTeam()
        .then(redirectToTeamSchedule); // send team name to the factory
    }
  };

  // CONTROLLER FUNCTIONS
  let redirectToTeamSchedule = UserService.redirectToTeamSchedule;

}]);
