(function() {
  'use strict';

  angular.module( 'controller.toolbar', [
    'angular-storage',
    'angular-jwt',
  ])
  .controller('ToolbarController', ToolbarController);


  function ToolbarController( $scope, $http, store, jwtHelper, $mdSidenav, $state) {
    $scope.jwt = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');


    $scope.toggleLeft = function(){ $mdSidenav('left').toggle(); };


    $scope.logout = function(){
      store.remove('jwt');
      store.remove('user.role');
      store.remove('user.favs');
      location.reload();
      $state.go('home.main.comms', {}, { reload: true });

    };
  };
}());
