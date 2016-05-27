(function() {
  'use strict';

  angular.module('factory.favs', ['kapeloi.config'])
    .factory("FavFactory", FavFactory);

  function FavFactory($http, hostServer){
    return {
      add: function(jwt, comm) {
        console.log('id::::'+JSON.stringify(comm.comm_id));
        return $http({
          method: 'POST',
          url: hostServer + '/favs/' + comm.comm_id,
          headers: {'x-access-token': jwt }
        });
      },
      delete: function(jwt, comm){
        console.log('id::::'+JSON.stringify(comm.comm_id));
        return $http({
          method: 'DELETE',
          url: hostServer + '/favs/' + comm.comm_id,
          headers: {'x-access-token': jwt }
        })
      }
    }
  }

}());
