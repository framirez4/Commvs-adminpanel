(function(){
  'use strict';

angular.module('factory.comm', [])
  .factory("CommFactory", CommFactory);

  function CommFactory($http){
    return {
      get: function() {
        return $http({
          method: 'GET',
          url: 'https://localhost:8000/api/comms'
        });
      }
    }
  }

})();
