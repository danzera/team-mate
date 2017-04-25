myApp.controller('UserController', ['$http', '$location', 'TeamService', function($http, $location, TeamService) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('Uno Momento - Checking user');
  var user = this; // reference to the controller -- matches controllerAs syntax
  user.userObject = TeamService.userObject;
  user.logout = TeamService.logout;
}]);
