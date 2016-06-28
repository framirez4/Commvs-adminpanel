(function() {
  'use strict';

  angular.module( 'controller.home', [
    'angular-storage',
    'angular-jwt'
  ])
  .controller('HomeController', HomeController);


  function HomeController( $scope, store, jwtHelper, $state, $http ) {
    $scope.city = ''; //var to get city from input
    $scope.position = {}; //object to store user position
    $scope.position.cityLocation = {};
    $scope.getCity = function(){
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.city +'+España&key=AIzaSyCySBPySoYOYgdGsDBeJuaTv3ZJByE91j4'
      }).then(function successCallback(data) {
        //Store city location (gps) and address (name + CP)
        $scope.position.cityLocation = data.data.results[0].geometry.location;
        $scope.position.address = data.data.results[0].formatted_address;
      },
      function errorCallback(data, status, headers, config) {
        console.warn("Error on geoCode call");
      });
    }

    $scope.getPosition = function(){
      if(navigator.geolocation) navigator.geolocation.getCurrentPosition(function(position){
        //Store user position from navigator
        $scope.position.cityLocation.lat = position.coords.latitude;
        $scope.position.cityLocation.lng = position.coords.longitude;
        $http({
          method: 'GET',
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.position.cityLocation.lat+','+$scope.position.cityLocation.lng+'&key=AIzaSyCySBPySoYOYgdGsDBeJuaTv3ZJByE91j4'
        }).then(function successCallback(data) {
          // Store user address from position
          $scope.position.address = data.data.results[0].formatted_address;
          $scope.position.locality = data.data.results[0].address_components[0].long_name;
        },
        function errorCallback(data, status, headers, config) {
          console.warn("Error on Geocode call");
        });
      },
      function(error){
        switch(error.code) {
          case error.PERMISSION_DENIED:
            $scope.geoError = "El usuario ha denegado la petición de Geolocalización."
            console.warn("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            $scope.geoError = "La información de la posición no está disponible."
            console.warn("Location information is unavailable.");
            break;
          case error.TIMEOUT:
          $scope.geoError = "La petición de Geolocalización ha caducado."
          console.warn("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            $scope.geoError = "Ha ocurrido un error desconocido."
            console.warn("An unknown error occurred.");
            break;
        }
      });
    };

    $scope.acceptFilter = function(){
      if(
        $scope.position.address &&
        $scope.position.cityLocation.lat &&
        $scope.position.cityLocation.lng
      ) {
        console.log("DONE! LET'S GO!");
        $state.go('main.comms', { position: $scope.position });
      }
    };

  };


})();
