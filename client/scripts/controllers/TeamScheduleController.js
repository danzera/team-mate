myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  // DATA-BINDING VARIABLES
  let teamSchedule = this; // controller reference
  teamSchedule.message = ''; // message to display if team has no games on its schedule
  teamSchedule.userObject = UserService.userObject;
  teamSchedule.currentTeamObject = UserService.currentTeamObject;
  
  
  // teamSchedule.currentTeamObject.clearGamesArray(); // scrub out any prior games array on view load
  // teamSchedule.playerStatusObject = UserService.playerStatusObject; // NEW
  // let currentTeamId = teamSchedule.currentTeamObject.getId();
  // teamSchedule.isManager = teamSchedule.playerStatusObject[currentTeamId].isManager;

  // DATA-BINDING FUNCTIONS
  // UserService.getTeamsGames(currentTeamId).then(function(gamesInfoArray) {
  //   // console.log('got all the teams games...', gamesInfoArray);
  //   if (!gamesInfoArray.length) {
  //     console.log('got to here.');
  //     if (teamSchedule.currentTeamObject.isManager) {
  //       teamSchedule.message = 'You\'re team does not currently have any games scheduled. Click "Add a Game"';
  //     } else {
  //       teamSchedule.message = 'Your team does not currently have any games scheduled. Talk to your manager about getting some games scheduled, or create a new team of your own!';
  //     }
  //   } else {
  //     for (i = 0; i < gamesInfoArray.length; i++) {
  //       // GOING TO NEED TO PULL OUT PLAYER STATUSES AFTER ADDING JOIN TO THE getTeamsGames route
  //       let gameId = gamesInfoArray[i].id; // will want this to be .game_id instead of .id after adding the join
  //       let gameDate = moment(gamesInfoArray[i].date).format('dddd, MMMM Do YYYY');
  //       let gameTime = moment(gamesInfoArray[i].time, 'HH:mm:ss').format('h:mm A');
  //       let location = gamesInfoArray[i].location;
  //       let opponent = gamesInfoArray[i].opponent;
  //       let curGame = new Game(gameId, currentTeamId, gameDate, gameTime, location, opponent);
  //       teamSchedule.currentTeamObject.addGame(curGame);
  //     }
  //   }
  // }); // end UserService.getTeamsGames

  // CONTROLLER VARIABLES/FUNCTIONS
  function verifyTeamHasGames(hasGames) {
    if(!hasGames && teamSchedule.currentTeamObject.isManager) {
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