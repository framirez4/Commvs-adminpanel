(function(){
  'use strict';

  //var HOST = 'https://api.commvs.tk'
  var HOST = 'http://192.168.1.140:8000'

  angular.module('factory.auth', [])
    .factory("AuthFactory", AuthFactory);

  function AuthFactory($http){
    return {
      auth: function(user) {
        return $http({
          method: 'POST',
          url: HOST+'/authenticate',
          data: user
        });
      }
    }
  }

})();
