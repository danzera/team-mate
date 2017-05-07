myApp.controller('AddPlayerController', ['UserService', function(UserService) {
  let addPlayer = this;
  addPlayer.message = '';
  addPlayer.playerEmail = '';
  addPlayer.currentTeamObject = UserService.currentTeamObject;
  console.log(addPlayer.currentTeamObject);

  addPlayer.invitePlayer = function() {
    if (!addPlayer.playerEmail) {  // make sure playerEmail field is complet
          addPlayer.message = 'Please enter an email address for the player you want to add.';
        } else { // playerEmail field is complete -- will want to add check to verify an email address has been entered
          addPlayer.message = ''; // reset error message to the empty string
          let teamId = addPlayer.currentTeamObject.getId();
          let email = addPlayer.playerEmail;
          let newInviteObject = new Invite(teamId, email, false); // hard-coding false in for now - could expand the form to include option to make the player a manager, but think AngularUI is needed to do so
          console.log('invite to be sent', newInviteObject);
          // alert('Player added! They will receive an e-mail directing them to join your team.');
          UserService.invitePlayer(newInviteObject); // send invite to the factory
        }
  };
}]);