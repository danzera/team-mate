angular
  .module('myApp')
  .controller('UserController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    // DATA-BINDING VARIABLES
    let vm = this; // controller reference
    vm.userObject = UserService.userObject;
    vm.currentTeamObject = UserService.currentTeamObject;

    // DATA-BINDING FUNCTIONS
    vm.logout = UserService.logout;
}]);
