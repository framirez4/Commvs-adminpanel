(function(){


  angular.module('factory.user', ['kapeloi.config'])
    .factory("UserFactory", UserFactory);

  function UserFactory($http, hostServer){
    return {
      // Get list of all users
      get: function(jwt) {
        return $http({
          method: 'GET',
          url: hostServer + '/users',
          headers: { 'x-access-token': jwt }
        });
      },
      // Add a new user
      add: function(user) {
        return $http({
          method: 'POST',
          url: hostServer + '/users',
          data: user
        });
      },
      put: function(jwt, password) {
        return $http({
          method: 'PUT',
          url: hostServer + '/users',
          headers: {'x-access-token': jwt },
          data: password
        });
      },
      // Delete a user by id
      delete: function(jwt, email) {
        console.log(email);
        return $http({
          method: 'DELETE',
          url: hostServer + '/users',
          headers: {'x-access-token': jwt },
          params: email
        });
      }
    };
  }

})();
