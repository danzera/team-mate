myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  let teamSchedule = this; // reference to the controller
  teamSchedule.userObject = UserService.userObject;
  teamSchedule.teamObject = UserService.teamObject;
  console.log('TeamScheduleController currentUserObject', teamSchedule.userObject);
  console.log('TeamScheduleController teamObject', teamSchedule.teamObject);
}]);
