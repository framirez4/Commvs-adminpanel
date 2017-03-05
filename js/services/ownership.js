  'use strict'

  angular.module('factory.own', ['kapeloi.config'])
    .factory('OwnershipFactory', OwnershipFactory)

  function OwnershipFactory ($http, hostServer) {
    return {
      get: function (jwt, commId) {
        return $http({
          method: 'GET',
          url: hostServer + '/ownership/' + commId,
          headers: {'x-access-token': jwt}
        })
      },
      post: function (jwt, commId, code) {
        return $http({
          method: 'POST',
          url: hostServer + '/ownership/' + commId,
          headers: {'x-access-token': jwt},
          data: {'key': code}
        })
      },
      delete: function (jwt, commId) {
        return $http({
          method: 'DELETE',
          url: hostServer + '/ownership/' + commId,
          headers: {'x-access-token': jwt}
        })
      }
    }
  }
