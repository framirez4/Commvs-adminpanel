(function(){
  'use strict';

  angular.module('factory.comm', ['kapeloi.config'])
    .factory("CommFactory", CommFactory);

  function CommFactory($http, hostServer){
    return {
      get: function(lat, long, loc) {
        return $http({
          method: 'GET',
          url: hostServer + '/comms',
          params: {lat: lat, lng: long, loc: loc}
        });
      },
      comm: function(comm_id) {
        return $http({
          method: 'GET',
          url: hostServer + '/comms/' + comm_id
        });
      },
      add: function(jwt, comm_obj) {
        return $http({
          method: 'POST',
          url: hostServer + '/comms',
          headers: {'x-access-token': jwt },
          data: comm_obj
        });
      },
      edit: function(jwt, comm_id, comm_obj) {
        return $http({
          method: 'PUT',
          url: hostServer + '/comms/' + comm_id,
          headers: {'x-access-token': jwt },
          data: comm_obj
        });
      },
      delete: function(jwt, comm_id) {
        return $http({
          method: 'DELETE',
          url: hostServer + '/comms/' + comm_id,
          headers: {'x-access-token': jwt }
        });
      }
    }
  }

})();
