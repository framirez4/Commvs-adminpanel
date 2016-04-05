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
      }
    }
  }

})();
