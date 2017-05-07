myApp.controller('UserController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  // DATA-BINDING VARIABLES
  let user = this; // controller reference
  user.userObject = UserService.userObject;
  user.currentTeamObject = UserService.currentTeamObject;

  // DATA-BINDING FUNCTIONS
  user.logout = UserService.logout;
}]);
