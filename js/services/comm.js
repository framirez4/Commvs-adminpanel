  'use strict'

  angular.module('factory.comm', ['kapeloi.config'])
    .factory('CommFactory', CommFactory)

  function CommFactory ($http, hostServer) {
    return {
      get: function (lat, long, loc) {
        return $http({
          method: 'GET',
          url: hostServer + '/comms',
          params: {lat: lat, lng: long, loc: loc}
        })
      },
      comm: function (commId) {
        return $http({
          method: 'GET',
          url: hostServer + '/comms/' + commId
        })
      },
      add: function (jwt, commObj) {
        return $http({
          method: 'POST',
          url: hostServer + '/comms',
          headers: {'x-access-token': jwt},
          data: commObj
        })
      },
      edit: function (jwt, commId, commObj) {
        return $http({
          method: 'PUT',
          url: hostServer + '/comms/' + commObj,
          headers: {'x-access-token': jwt},
          data: commObj
        })
      },
      delete: function (jwt, commId) {
        return $http({
          method: 'DELETE',
          url: hostServer + '/comms/' + commId,
          headers: {'x-access-token': jwt}
        })
      }
    }
  }
