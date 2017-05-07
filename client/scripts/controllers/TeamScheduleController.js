myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let teamSchedule = this; // controller reference
  teamSchedule.message = ''; // message to display if team has no games on its schedule
  teamSchedule.userObject = UserService.userObject;
  teamSchedule.currentTeamObject = UserService.currentTeamObject;

  // CONTROLLER FUNCTIONS
  function verifyTeamHasGames(hasGames) {
    if(!hasGames && teamSchedule.currentTeamObject.manager) {
      teamSchedule.message = 'You\'re team does not currently have any games scheduled. Click "Add a Game!"';
    } else if (!hasGames) {
      teamSchedule.message = 'Your team does not currently have any games scheduled. Talk to your manager about getting some games scheduled, or create a new team of your own!';
    } else {
      teamSchedule.message = '';
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