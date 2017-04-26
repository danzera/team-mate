myApp.controller('AllTeamsController', ['UserService', function(UserService) {
  console.log('hello from the AllTeamsController');
  let testTeam = new Team(1, 'Dukes');
  console.log('testTeam:', testTeam);
}]);
