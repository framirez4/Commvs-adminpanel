(function(){
  'use strict';

angular.module('factory.own', ['kapeloi.config'])
  .factory("OwnershipFactory", OwnershipFactory);

function OwnershipFactory($http, hostServer){
  return {
    get: function(jwt, id) {
      return $http({
        method: 'GET',
        url: hostServer + '/ownership/' + id,
        headers: {'x-access-token': jwt }
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
