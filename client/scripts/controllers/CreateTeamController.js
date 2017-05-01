myApp.controller('CreateTeamController', ['UserService', function(UserService) {
  let createTeam = this; // create a reference to the controller
  createTeam.errorMessage = '';
  createTeam.teamObject = UserService.teamObject;
  createTeam.addNewTeam = function() {
    if (!createTeam.teamObject.getName()) { // team name name is blank - alert user
      createTeam.errorMessage = 'Please enter a name for your team.';
    } else { // team name not blank - send teamName to factory
      createTeam.errorMessage = ''; // set error message back to empty string
      UserService.addNewTeam(createTeam.teamObject); // send team name to the factory
    }
  }; // end createTeam.addNewTeam
}]);
