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
    post: function(jwt, comm_id, code) {
      return $http({
        method: 'POST',
        url: hostServer + '/ownership/' + comm_id,
        headers: {'x-access-token': jwt },
        data: { 'key': code }
      });
    },
    delete: function(jwt, comm_id) {
      return $http({
        method: 'DELETE',
        url: hostServer + '/ownership/' + comm_id,
        headers: {'x-access-token': jwt }
      });
    }
  }
}

})();
