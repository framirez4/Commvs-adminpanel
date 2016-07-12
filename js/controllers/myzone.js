(function() {
  'use strict';

  angular.module('controller.myZone', ['angular-storage', 'angular-jwt'])
      .controller('myZoneController', myZoneController );

  /* @ngInject */
    function myZoneController($scope, $rootScope, store, $state) {
      console.log('hiho');

  }
})();
