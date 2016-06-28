(function() {
  'use strict';

  angular.module( 'controller.comms', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own'
  ])
  .controller('CommsController', CommsController);


  function CommsController( $rootScope, $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state, $stateParams) {



    $scope.jwt = store.get('jwt');

    $scope.getComms = function(position) {
      if(!position) position = {position: {cityLocation: {lat: '', lng: ''}}};
        $scope.address_available = position.address;
        // Asks for commerces according to data obtained from home.
        CommFactory.get(position.cityLocation.lat, position.cityLocation.lng)
        .then(function(data) {
          $scope.comms = data.data;
        });
    };


/*
    $scope.addComm = function() {
      console.log($scope.newcomm);
      CommFactory.add(store.get('jwt'), $scope.newcomm)
      .then(function(data) {
        $scope.getComms();
      })
    };
    $scope.editComm = function() {
      console.log($scope.editcomm);
      CommFactory.edit(store.get('jwt'), $scope.editcomm)
      .then(function(data){
        console.log(data);
        if(data.data.success) $state.go('home.main.owners.list');
      });
    }


    $scope.deleteComm = function(id) {
      CommFactory.delete(store.get('jwt'), id)
      .then(function(data) {
        $scope.getComms();
      });
    };
*/
    $scope.toggleStar = function(id) {
      // if id not in user favs
      var index = $rootScope.favs.indexOf(id)
      if(index == -1) {
        FavFactory.add(store.get('jwt'), {'comm_id': id })
        .then(function(res){
          if(res.data.success){
            $rootScope.favs.push(id);
            store.set('user.favs', $rootScope.favs);
            console.log(res.data);
          }

        });
      } else {
        FavFactory.delete(store.get('jwt'), {'comm_id': id })
        .then(function(res){
          if(res.data.success){
            $rootScope.favs.splice(index, 1);
            store.set('user.favs', $rootScope.favs);
            console.log(res.data);
          }
        });
      }

    };
/*
    $scope.getOwnerkey = function(id, ev) {
      OwnershipFactory.get(store.get('jwt'), id)
      .then(function(data){
        console.log(data.data);
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
    */



    if($stateParams.position.cityLocation) {
      console.log('Using parameters to get comms.');
      store.set("user.position", $stateParams.position);
      $scope.position = $stateParams.position;
      $scope.getComms($scope.position);
    } else if (store.get("user.position")) {
      console.log('Using localstorage to get comms.');
      $scope.position = store.get("user.position");
      $scope.getComms($scope.position);
    } else {
      $state.go('main.home');
    }


  }; // CommsCtrl end



})();
