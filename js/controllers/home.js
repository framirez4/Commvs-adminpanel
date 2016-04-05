(function() {
  'use strict';

  angular.module( 'controller.home', [
    'angular-storage',
    'angular-jwt'


  ])
  .controller('HomeCtrl', HomeController)
  .controller('LeftCtrl', LeftCtrl);


  function HomeController( $scope, $http, store, jwtHelper, UserFactory, CommFactory, $mdSidenav, $mdDialog, $state) {

    $scope.toggleLeft = function(){ $mdSidenav('left').toggle(); };


    $scope.logout = function(){
      store.remove('jwt');
      $state.go('login');
    };

    $scope.jwt = store.get('jwt');
    //$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);



    $scope.getUsers = function(){
      UserFactory.get($scope.jwt)
      .then(function(data) {
        $scope.users = data.data;
      });
    }
    $scope.deleteUser = function(email) {
      UserFactory.delete($scope.jwt, {'email': email })
      .then(function(data) {
        $scope.getUsers();
      })
    }



    $scope.getComms = function() {
      CommFactory.get()
      .then(function(data) {
        $scope.comms = data.data;
      });
    }/*
    $scope.deleteComm = function(id) {
      var url = 'https://localhost:8000/api/comms/'+id;
      $http({
        method: 'DELETE',
        url: url,
        headers: {'x-access-token': $scope.jwt }
      }).then(function(data) {
        $scope.getUsers();
      })
    };*/

    $scope.getUsers();
    $scope.getComms();


  };

  function LeftCtrl ($scope, $mdSidenav) {
    $scope.close = function () {
      $mdSidenav('left').close();
    };
  };


})();
