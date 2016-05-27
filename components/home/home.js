(function() {
  'use strict';

  angular.module( 'controller.home', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own'
  ])
  .controller('HomeController', HomeController);


  function HomeController( $scope, $http, store, jwtHelper, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state) {




  }; // HomeCtrl end



})();
