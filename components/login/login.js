(function() {
  'use strict';


  angular.module( 'controller.login', [
    'angular-storage',
    'angular-jwt',
    'factory.auth'
  ])
  .controller( 'LoginController', LoginController );

  function LoginController( $rootScope, $scope, $http, jwtHelper, store, $state, AuthFactory, $stateParams ) {

    $scope.user = {};
    $scope.dest = '';

    $scope.login = function() {
      AuthFactory.auth($scope.user)
      .then(function(response) {
        if(response.data.success == true){
          store.set('jwt', response.data.token);
          var decoded = jwtHelper.decodeToken(response.data.token)._doc;
          console.log(decoded);
          store.set('token.created', Date.now());
          store.set('user.first_name', decoded.first_name);
          store.set('user.last_name', decoded.last_name);
          store.set('user._id', decoded._id);
          store.set('user.role', decoded.role);
          store.set('user.favs', decoded.favs);
          store.set('user.owns', decoded.owns);

          if(!$stateParams.dest) $stateParams.dest = 'home.main'
          $state.go($stateParams.dest, {}, {reload: true});
        } else {
          $scope.loginErr = response.data.message;
        }

      }, function(error) {
        alert(error.data);
      });
    }


  };

})();
