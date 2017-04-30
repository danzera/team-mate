myApp.controller('TeamScheduleController', ['UserService', function(UserService) {
  let teamSchedule = this; // reference to the controller
  console.log('hello from the TeamScheduleController');
  teamSchedule.userObject = UserService.userObject;
  teamSchedule.teamObject = UserService.teamObject;
  console.log('currentUserObject', teamSchedule.userObject);
  console.log('teamObject', teamSchedule.teamObject);
}]);
