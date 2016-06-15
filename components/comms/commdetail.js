(function() {
  'use strict';

  angular.module( 'controller.commdetail', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own'
  ])
  .controller('CommsDetailController', CommsDetailController);


  function CommsDetailController( $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state, $stateParams) {

    $scope.jwt = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');

    $scope.getComm = function(comm) {
      CommFactory.comm(comm).
      then(function(res){
        $scope.data = res.data;
      })
    };
    $scope.toggleStar = function(id) {
      // if id not in user favs
      var index = $scope.favs.indexOf(id)
      if(index == -1) {
        FavFactory.add(store.get('jwt'), {'comm_id': id })
        .then(function(data){
          $scope.favs.push(id);
          store.set('user.favs', $scope.favs);
          console.log(data.data.message);
        });
      } else {
        FavFactory.delete(store.get('jwt'), {'comm_id': id })
        .then(function(data){
          $scope.favs.splice(index, 1);
          store.set('user.favs', $scope.favs);
          console.log(data.data.message);
        });
      }

    };
    console.log($stateParams);
    $scope.getComm($stateParams.comm);

  };



})();
