(function(){

angular.module('factory.user', ['ngResource'])
  .factory("UserFactory", UserFactory);

  function UserFactory($http, $resource){
    return {
      get: function(jwt) {
        return $http({
          method: 'GET',
          url: 'https://localhost:8000/api/users',
          headers: { 'x-access-token': jwt }
        });
      },
      delete: function(jwt, id) {
        return $http({
          method: 'DELETE',
          url: 'https://localhost:8000/api/users/'+id,
          headers: {'x-access-token': jwt }
        })
      },
      add: function(user) {
        return $http({
          method: 'POST',
          url: 'https://localhost:8000/api/users',
          data: user
        })
      }
    }
  }

})();
