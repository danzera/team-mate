angular
  .module('myApp')
  .controller('AllTeamsController', ['UserService', function(UserService) {
    // DATA-BINDING VARIABLES
    let vm = this; // controller reference
    vm.message = ''; // used for error handling
    vm.userObject = UserService.userObject;
    vm.currentTeamObject = UserService.currentTeamObject;
    
    // DATA-BINDING FUNCTIONS
    vm.acceptInvite = function(teamObject) {
      setCurrentTeamInfo(teamObject);
      // delete invite from the DB, add user to the team, refresh the DOM
      UserService.acceptInvite(teamObject.team_id)
        .then(addPlayerToTeam(teamObject))
        .then(refreshData);
    };
    
    vm.goToTeamSchedule = function(teamObject) {
      setCurrentTeamInfo(teamObject);
      UserService.redirectToTeamSchedule();
    };

    // CONTROLLER FUNCTIONS
    let getUsersInvites = UserService.getUsersInvites;
    let getUsersTeams = UserService.getUsersTeams;
    let addPlayerToTeam = UserService.addPlayerToTeam;
    let setCurrentTeamInfo = UserService.setCurrentTeamInfo;

    function verifyUserHasTeams(hasTeams) { // set message to display if user is not a member of a team yet
      if(!hasTeams) {
        vm.message = 'You\'re not currently a member of any teams. Please join or create a new team.';
      } else {
        vm.message = '';
      }
    }

    function refreshData() {
      UserService.clearCurrentTeam();
      getUsersInvites()
        .then(getUsersTeams)
        .then(verifyUserHasTeams);
    }

    // RUN AT CONTROLLER LOAD
    refreshData();
}]); // END CONTROLLER