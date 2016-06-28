(function() {
  'use strict';

  angular.module( 'controller.favs', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own'
  ])
  .controller('FavsController', FavsController);


  function FavsController( $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state) {

    $scope.jwt = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');
    $scope.comms = [];
    $scope.getFavs = function() {
      var favsLength = $scope.favs.length;
      for(var i = 0; i < favsLength; i++){

        CommFactory.comm($scope.favs[i])
        .then(function(data) {
          $scope.comms.push(data.data);
        });
      }
    };



    $scope.addComm = function() {
      CommFactory.add(store.get('jwt'), $scope.newcomm)
      .then(function(data) {
        $scope.getComms();
      })
    };

    $scope.deleteComm = function(id) {
      CommFactory.delete(store.get('jwt'), id)
      .then(function(data) {
        $scope.getComms();
      });
    };

    $scope.toggleStar = function(id) {
      // if id not in user favs
      var index = $scope.favs.indexOf(id)
      if(index == -1) {
        FavFactory.add(store.get('jwt'), {'comm_id': id })
        .then(function(data){
          $scope.favs.push(id);
          store.set('user.favs', $scope.favs);
        });
      } else {
        FavFactory.delete(store.get('jwt'), {'comm_id': id })
        .then(function(data){
          $scope.favs.splice(index, 1);
          store.set('user.favs', $scope.favs);
        });
      }

    };

    $scope.getOwnerkey = function(id, ev) {
      OwnershipFactory.get(store.get('jwt'), id)
      .then(function(data){
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Ownership key for ' + data.data.name)
              .textContent('Key: ' + data.data.ownership.key)
              .ariaLabel('Ownership dialog')
              .ok('Got it!')
              .targetEvent(ev)
          );

      });
    };

    $scope.getFavs();
  }; // FavsCtrl end



})();
