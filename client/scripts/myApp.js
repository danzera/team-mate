angular
  .module('myApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', config]);

// -----ROUTES-----  
function config($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    })
    .when('/all-teams', { // lists all of a user's teams when they are logged in
      templateUrl: '/views/templates/all-teams.html',
      controller: 'AllTeamsController',
      controllerAs: 'vm',
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .when('/create-team', { // lets a user create a new team
      templateUrl: '/views/templates/create-team.html',
      controller: 'CreateTeamController',
      controllerAs: 'vm',
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .when('/team-schedule', { // displays current team schedule
      templateUrl: '/views/templates/team-schedule.html',
      controller: 'TeamScheduleController',
      controllerAs: 'vm',
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .when('/add-game', { // go to add-game view with a form for adding a game
      templateUrl: '/views/templates/add-game.html',
      controller: 'AddGameController',
      controllerAs: 'vm',
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .when('/add-player', { // go to add-player view with a form for adding a player
      templateUrl: '/views/templates/add-player.html',
      controller: 'AddPlayerController',
      controllerAs: 'vm',
      resolve: { // get user from factory
        getuser : ['UserService', function(UserService){
          return UserService.getUser();
        }]
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}
