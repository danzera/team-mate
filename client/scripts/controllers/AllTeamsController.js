myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let allTeams = this; // controller reference
  allTeams.message = ''; // used for error handling
  allTeams.userObject = UserService.userObject;
  allTeams.currentTeamObject = UserService.currentTeamObject;
  
  // DATA-BINDING FUNCTIONS
  allTeams.acceptInvite = function(inviteObject) {
    console.log('user wants to join team:', inviteObject);
    UserService.acceptInvite(inviteObject.team_id)
      .then(addPlayerToTeam(inviteObject))
      .then(refreshData);
  };
  
  allTeams.goToTeamSchedule = function(teamObject) {
    allTeams.currentTeamObject.id = teamObject.team_id;
    allTeams.currentTeamObject.name = teamObject.name;
    allTeams.currentTeamObject.isManager = teamObject.manager;
    console.log('navigating to team-schedule for team:', allTeams.currentTeamObject);
    UserService.redirectToTeamSchedule();
  };

  // CONTROLLER VARIABLES/FUNCTIONS
  let getUsersInvites = UserService.getUsersInvites;
  let getUsersTeams = UserService.getUsersTeams;
  let addPlayerToTeam = UserService.addPlayerToTeam;

  function verifyUserHasTeams(hasTeams) { // set message to display if user is not a member of a team yet
    if(!hasTeams) {
      allTeams.message = 'You\'re not currently a member of any teams. Please join or create a new team.';
    } else {
      allTeams.message = '';
    }
  }

  function refreshData() {
    getUsersInvites()
      .then(getUsersTeams)
      .then(verifyUserHasTeams);
  }

  // RUN AT CONTROLLER LOAD
  refreshData();

}]); // END CONTROLLER