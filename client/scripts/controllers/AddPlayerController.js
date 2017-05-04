myApp.controller('AddPlayerController', ['UserService', function(UserService) {
  let addPlayer = this;
  addPlayer.message = '';
  addPlayer.playerEmail = '';
  addPlayer.currentTeamObject = UserService.currentTeamObject;
  console.log(addPlayer.currentTeamObject);

  addPlayer.addNewPlayer = function() {
    if (!addPlayer.playerEmail) {  // make sure playerEmail field is complet
          addPlayer.message = 'Please enter an email address for the player you want to add.';
        } else { // playerEmail field is complete -- will want to add check to verify an email address has been entered
          addPlayer.errorMessage = ''; // reset error message to the empty string
          let teamId = addPlayer.currentTeamObject.getId();
          let email = addPlayer.playerEmail;
          let isManager = addPlayer.isManager;
          let newInviteObject = new Invite(teamId, email, isManager);
          alert('Player added! They will receive an e-mail directing them to join your team.');
          UserService.addNewPlayer(newInvite); // send invite to the factory
        }
  };
}]);