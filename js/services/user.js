(function(){

  //var HOST = 'https://api.commvs.tk'
  var HOST = 'http://192.168.1.140:8000'

  angular.module('factory.user', [])
    .factory("UserFactory", UserFactory);

  function UserFactory($http){
    return {
      // Get list of all users
      get: function(jwt) {
        return $http({
          method: 'GET',
          url: HOST + '/users',
          headers: { 'x-access-token': jwt }
        });
      },
      // Add a new user
      add: function(user) {
        return $http({
          method: 'POST',
          url: HOST + '/users',
          data: user
        });
      },
      put: function(password) {
        return $http({
          method: 'PUT',
          url: HOST + '/users',
          data: { password: password }
        });
      },
      // Delete a user by id
      delete: function(jwt, email) {
        console.log(email);
        return $http({
          method: 'DELETE',
          url: HOST + '/users',
          headers: {'x-access-token': jwt },
          params: email
        });
      }
    };
  }

})();
