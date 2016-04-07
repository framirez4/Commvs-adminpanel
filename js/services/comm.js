(function(){
  'use strict';

  angular.module('factory.comm', ['kapeloi.config'])
    .factory("CommFactory", CommFactory);

  function CommFactory($http, hostServer){
    return {
      get: function() {
        return $http({
          method: 'GET',
          url: hostServer + '/comms'
        });
      },
      add: function(jwt, comm) {
        return $http({
          method: 'POST',
          url: hostServer + '/comms',
          headers: {'x-access-token': jwt },
          data: comm
        });
      },
      delete: function(jwt, comm) {
        return $http({
          method: 'DELETE',
          url: hostServer + '/comms/' + comm,
          headers: {'x-access-token': jwt }
        });
      }
    }
  }

})();
