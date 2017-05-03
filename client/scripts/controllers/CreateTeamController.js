myApp.controller('CreateTeamController', ['UserService', function(UserService) {
  let createTeam = this; // create a reference to the controller
  createTeam.errorMessage = '';
  createTeam.teamName = '';
  createTeam.addNewTeam = function() {
    if (createTeam.teamName === '') { // team name name is blank - alert user
      createTeam.errorMessage = 'Please enter a name for your team.';
    } else { // team name not blank - send teamName to factory
      createTeam.errorMessage = ''; // set error message back to empty string
      UserService.addNewTeam(createTeam.teamName); // send team name to the factory
    }
  }; // end createTeam.addNewTeam
}]);
