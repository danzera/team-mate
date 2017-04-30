myApp.controller('CreateTeamController', ['UserService', function(UserService) {
  // create a reference to the controller
  let createTeam = this;
  // error message if user tries to create a team without inputting name
  createTeam.errorMessage = '';
  // bind new team name to DOM input
  createTeam.teamName = '';
  // postNewTeam function used on form submittal to send teamName to the factory
  createTeam.postNewTeam = function(teamName) {
    if (!teamName) { // teamName name is blank - alert user
      createTeam.errorMessage = 'Please enter a name for your team.';
    } else { // teamName not blank - send teamName to factory
      createTeam.errorMessage = ''; // set error message back to empty string
      UserService.postNewTeam(teamName); // send team name to the factory
    }
  }; // end createTeam.postNewTeam
}]);
