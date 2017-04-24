myApp.controller('UserController', ['$scope', '$http', '$location', 'TeamService', function($scope, $http, $location, TeamService) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');
  $scope.userObject = TeamService.userObject;
  $scope.logout = TeamService.logout;
}]);
