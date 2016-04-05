(function() {
  'use strict';
  //var HOST = 'https://api.commvs.tk'
  var HOST = 'http://192.168.1.140:8000'

  angular.module('factory.favs', [])
    .factory("FavFactory", FavFactory);

  function FavFactory($http){
    return {
      add: function() {
        return $http({
          method: 'GET',
          url: HOST + '/comms'
        });
      },
      remove: function)(){
        return $http({
          method: 'DELETE',
          url: 
        })
      }
    }
  }

}());
