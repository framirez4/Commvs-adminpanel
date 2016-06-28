(function() {
  'use strict';

  angular.module( 'controller.users', [
    'angular-storage',
    'angular-jwt',
    'factory.user',

  ])
  .controller('UsersController', UsersController);


  function UsersController( $scope, $http, store, jwtHelper, UserFactory, $mdDialog, $state) {

    $scope.jwt = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');

    $scope.getUsers = function(){
      UserFactory.get(store.get('jwt'))
      .then(function(data) {
        $scope.users = data.data;
      });
    }

    $scope.deleteUser = function(email) {
      UserFactory.delete(store.get('jwt'), {'email': email })
      .then(function(data) {
        $scope.getUsers();
      })
    }

    $scope.getUsers();

  }; // UsersCtrl end
})();
