myApp.controller('HomeController', ['UserService', function(UserService){
  console.log('home controller loaded.');
  let home = this;
  home.redirectToLogin = UserService.redirectToLogin;
}]);
