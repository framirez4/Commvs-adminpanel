(function() {
  'use strict';

  angular.module( 'controller.toolbar', [
    'angular-storage',
    'angular-jwt',
  ])
  .controller('ToolbarController', ToolbarController);


  function ToolbarController($rootScope, $scope, store, jwtHelper, $mdSidenav, $state) {

    $scope.toggleLeft = function(){ $mdSidenav('left').toggle(); };

    $scope.logout = function(){
      store.remove('jwt');
      store.remove('user.role');
      store.remove('user.favs');
      store.remove('user.owns');
      store.remove('user._id');
      store.remove('user.first_name');
      store.remove('user.last_name');
      store.remove('token.created');
      delete $rootScope.first_name;
      delete $rootScope.last_name;
      delete $rootScope._id;
      $rootScope.isLogged = false;
      $rootScope.isAdmin = false;
      location.reload();
      $state.go('home.main.comms', {}, { reload: true });
    };
  };
}());



/*store.set('token.created', Date.now());

*/
