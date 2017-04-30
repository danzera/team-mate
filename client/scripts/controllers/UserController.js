myApp.controller('UserController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  var user = this; // reference to the controller -- matches controllerAs syntax
  user.userObject = UserService.userObject;
  user.logout = UserService.logout;
}]);
