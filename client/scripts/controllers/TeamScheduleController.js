myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  let teamSchedule = this; // reference to the controller
  teamSchedule.message = ''; // message to display if team has no games on its schedule
  teamSchedule.userObject = UserService.userObject;
  teamSchedule.currentTeamObject = UserService.currentTeamObject;
  teamSchedule.currentTeamObject.clearGamesArray(); // scrub out any prior games array on view load
  
  let currentTeamId = teamSchedule.currentTeamObject.getId();
  teamSchedule.isManager = teamSchedule.userObject.teamStatusObject[currentTeamId].isManager;
  
  UserService.getTeamsGames(currentTeamId).then(function(gamesInfoArray) {
    console.log('got all the teams games...', gamesInfoArray);
    if (!gamesInfoArray.length) {
      console.log('got to here.');
      if (teamSchedule.userObject.teamStatusObject[currentTeamId].isManager) {
        teamSchedule.message = 'You\'re team does not currently have any games scheduled. Click "Add a Game"';
      } else {
        teamSchedule.message = 'Your team does not currently have any games scheduled. Talk to your manager about getting some games scheduled, or create a new team of your own!';
      }
    } else {
      for (i = 0; i < gamesInfoArray.length; i++) {
        // GOING TO NEED TO PULL OUT PLAYER STATUSES AFTER ADDING JOIN TO THE getTeamsGames route
        let gameId = gamesInfoArray[i].id; // will want this to be .game_id instead of .id after adding the join
        let gameDate = moment(gamesInfoArray[i].date).format('dddd, MMMM Do YYYY');
        let gameTime = moment(gamesInfoArray[i].time, 'HH:mm:ss').format('h:mm A');
        let location = gamesInfoArray[i].location;
        let opponent = gamesInfoArray[i].opponent;
        let curGame = new Game(gameId, currentTeamId, gameDate, gameTime, location, opponent);
        teamSchedule.currentTeamObject.addGame(curGame);
      }
      console.log('ADDING ALL THE FREAKING GAMES!', teamSchedule.currentTeamObject.getGamesArray());
    }
  }); // end UserService.getTeamsGames
}]);
