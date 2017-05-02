myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  let teamSchedule = this; // reference to the controller
  teamSchedule.userObject = UserService.userObject;
  console.log('TeamScheduleController loaded with team', teamSchedule.userObject);
  teamSchedule.currentTeamObject = UserService.currentTeamObject;
  console.log('TeamScheduleController loaded with team', teamSchedule.currentTeamObject);
}]);
