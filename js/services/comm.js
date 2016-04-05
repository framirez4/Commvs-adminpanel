(function(){
  'use strict';

  //var HOST = 'https://api.commvs.tk'
  var HOST = 'http://192.168.1.140:8000'

  angular.module('factory.comm', [])
    .factory("CommFactory", CommFactory);

  function CommFactory($http){
    return {
      get: function() {
        return $http({
          method: 'GET',
          url: HOST + '/comms'
        });
      }
    }
  }

})();
