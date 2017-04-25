var myApp = angular.module('myApp', ['ngRoute']);
// -----ROUTES-----
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController',
      controllerAs: 'user',
      resolve: {
        getuser : ['TeamService', function(TeamService){
          return TeamService.getUser();
        }]
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
