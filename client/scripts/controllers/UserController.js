myApp.controller('UserController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user in the UserController');
  var user = this; // reference to the controller -- matches controllerAs syntax
  user.userObject = UserService.userObject;
  console.log('initial userObject in the UserController:', user.userObject);
  user.logout = UserService.logout;
}]);
