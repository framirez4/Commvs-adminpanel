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


  function CommsController( $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state) {

    $scope.jwt = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');

    $scope.getComms = function() {
      if(navigator.geolocation) navigator.geolocation.getCurrentPosition(function(position){
        $scope.geolocation = '(' + position.coords.latitude + ', ' + position.coords.longitude + ')';
        //$scope.coords = position.coords;
        CommFactory.get(position.coords.latitude, position.coords.longitude)
        .then(function(data) {
          $scope.comms = data.data;
        });
      },
      function(error){
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.warn("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.warn("Location information is unavailable.");
            break;
          case error.TIMEOUT:
          console.warn("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.warn("An unknown error occurred.");
            break;
        }
        CommFactory.get()
        .then(function(data) {
          $scope.comms = data.data;
        });
      });


    };



    $scope.addComm = function() {
      console.log($scope.newcomm);
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

    $scope.getComms();

  }; // CommsCtrl end



})();
