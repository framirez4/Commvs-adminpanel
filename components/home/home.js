(function() {
  'use strict';

  angular.module( 'controller.home', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own',
    'factory.auth'
  ])
  .controller('HomeController', HomeController);


  function HomeController( $scope, $http, store, jwtHelper, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state, AuthFactory) {

    $scope.homeAuth = function() {
      AuthFactory.auth({email: 'francescramirez@gmail.com', password: '123456'})
      .then(function(response){
        $scope.response = response.data;
        $scope.jwt = response.data.token;
      })
      .catch(function(err){
        console.log(err);
      })
    }

    $scope.homeRefresh = function() {
      AuthFactory.refresh($scope.jwt)
      .then(function(response){
        $scope.response = response.data;
      })
      .catch(function(err){
        console.log(err);
      })
    }



  }; // HomeCtrl end



})();
