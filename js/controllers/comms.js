(function() {
  'use strict';

  angular.module( 'controller.comms', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own',
    'factory.search'
  ])
  .controller('CommsController', CommsController);


  function CommsController( $rootScope, $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, SearchFactory, $mdDialog, $state, $stateParams) {
    $scope.searchName = ''


    $scope.jwt = store.get('jwt');

    $scope.getComms = function(position) {
      if(!position) position = {position: {cityLocation: {lat: '', lng: ''}}, locality: ''};
        $scope.address_available = position.address;
        // Asks for commerces according to data obtained from home.
        CommFactory.get(position.cityLocation.lat, position.cityLocation.lng, position.locality)
        .then(function(data) {
          if(!data.data){
            $scope.emptyCommList = true;
          } else {
            $scope.comms = data.data;
          }

        });
    };
    $scope.searchComms = function() {
        // Asks for commerces according to data obtained from home.
        SearchFactory.get({name: $scope.searchName})
        .then(function(data) {
          console.log(data);
          $scope.comms = [];
          if(!data.length){
            $scope.emptyCommList = true;
          } else {
            $scope.comms = data;
          }

        });
    };

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
