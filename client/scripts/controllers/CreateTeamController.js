myApp.controller('CreateTeamController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let createTeam = this; // controller reference
  createTeam.message = ''; 
  createTeam.teamName = '';
  createTeam.currentTeamObject = UserService.currentTeamObject;
  console.log('createTeam controller loaded with currentTeam:', createTeam.currentTeamObject);

  // DATA-BINDING FUNCTIONS
  createTeam.addNewTeam = function(teamName) {
    if (teamName === '') {
      createTeam.message = 'Please enter a name for your team.';
    } else {
      createTeam.message = ''; // set error message back to empty string
      createTeam.currentTeamObject.name = teamName;
      createTeam.currentTeamObject.manager = true;
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
}]);
