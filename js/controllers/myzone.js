(function() {
  'use strict';

  angular.module('controller.myZone', [
    'angular-storage',
    'angular-jwt',
    'factory.comm',
    'factory.own',
    'factory.search'
  ])
      .controller('myZoneController', myZoneController );

  /* @ngInject */
    function myZoneController($scope, $rootScope, store, $state, CommFactory, OwnershipFactory, SearchFactory, $mdDialog ) {
      $scope.myZoneName = store.get("user.loc");

      $scope.getComms = function() {
        console.log("Get comms from my zone: " + store.get("user.loc"));
        //var position = {position: {cityLocation: {lat: '', lng: ''}}}
        // Asks for commerces according to data obtained from home.
        CommFactory.get('','', store.get("user.loc"))
        .then(function(data) {
          if(!data.data){
            $scope.emptyCommList = true;
          } else {
            $scope.comms = data.data;
          }

        });
      };

      $scope.deleteComm = function(id) {
        CommFactory.delete(store.get('jwt'), id)
        .then(function(data) {
          $scope.getComms();
        });
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
  }
})();
