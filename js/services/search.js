(function(){
  'use strict';

angular.module('factory.search', ['kapeloi.config'])
  .factory("SearchFactory", SearchFactory);

function SearchFactory($http, $q, hostServer){
  return {
    get: function(query) {
      var defered = $q.defer();
      var promise = defered.promise;

      $http({
        method: 'GET',
        url: hostServer + '/search',
        params: query
      })
      .success(function(data){
        defered.resolve(data);
      })
      .error(function(err){
        defered.reject(err);
      });
      return promise;
    }
  }
}

})();
