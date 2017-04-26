myApp.controller('CreateTeamController', [function() {
  console.log('hello from the CreateTeamController');
  let createTeam = this;
  let newTeam = new Team();
  console.log(newTeam);
  createTeam.teamName = '';
  createTeam.postNewTeam = function() {
    alert('greetings from the controller');
  };
}]);
