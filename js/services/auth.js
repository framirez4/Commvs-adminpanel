(function(){
  'use strict';

  angular.module('factory.auth', ['kapeloi.config'])
    .factory("AuthFactory", AuthFactory);

  function AuthFactory($http, hostServer){

    return {
      auth: function(user) {
        return $http({
          method: 'POST',
          url: hostServer + '/authenticate',
          data: user
        });
      },
      refresh: function(jwt) {
        return $http({
          method: 'POST',
          url: hostServer + '/authenticate/refresh',
          headers: { 'x-access-token': jwt }
        });
      }
    }
  }

})();
