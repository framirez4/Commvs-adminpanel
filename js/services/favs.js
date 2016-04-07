(function() {
  'use strict';

  angular.module('factory.favs', ['kapeloi.config'])
    .factory("FavFactory", FavFactory);

  function FavFactory($http, hostServer){
    return {
      add: function(jwt, id) {
        console.log('id::::'+JSON.stringify(id));
        return $http({
          method: 'POST',
          url: hostServer + '/favs',
          headers: {'x-access-token': jwt },
          data: id
        });
      },
      delete: function(jwt, id){
        console.log('id::::'+JSON.stringify(id));
        return $http({
          method: 'DELETE',
          url: hostServer + '/favs',
          headers: {'x-access-token': jwt },
          params: id
        })
      }
    }
  }

}());
