var myApp = angular.module('myApp', ['ngRoute']);
// -----ROUTES-----
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      //controller: 'HomeController',
      //controllerAs: 'home'
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
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
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .when('/all-teams', { // lists all of a user's teams when they are logged in
      templateUrl: '/views/templates/all-teams.html',
      controller: 'AllTeamsController',
      controllerAs: 'allTeams',
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
