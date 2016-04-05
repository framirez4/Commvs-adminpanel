(function() {
  'use strict';

  angular.module('factory.favs', ['kapeloi.config'])
    .factory("FavFactory", FavFactory);

  function FavFactory($http, hostServer){
    return {
      add: function() {
        return $http({
          method: 'GET',
          url: hostServer + '/comms'
        });
      },
      remove: function)(){
        return $http({
          method: 'DELETE',
          url: hostServer + '/favs'
        })
      }
    }
  }

}());
