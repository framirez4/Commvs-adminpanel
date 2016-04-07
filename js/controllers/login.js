(function() {
  'use strict';


  angular.module( 'controller.login', [
    'angular-storage',
    'angular-jwt',
    'factory.auth'
  ])
  .controller( 'LoginCtrl', LoginController );

  function LoginController( $scope, $http, jwtHelper, store, $state, AuthFactory) {

    $scope.user = {};
    $scope.$on('signupSuccess', function(event, data) {
      $scope.signupSuccess = data;
    });

    $scope.login = function() {
      AuthFactory.auth($scope.user)
      .then(function(response) {
        if(response.data.success == true){
          store.set('jwt', response.data.token);
          var decoded = jwtHelper.decodeToken(response.data.token)._doc;
          store.set('user.id', decoded._id);
          store.set('user.role', decoded.role);
          store.set('user.favs', decoded.favs);
          console.log(store.get('user.favs'));
          $state.go('home');
        } else {
          $scope.loginErr = response.data.message;
        }

      }, function(error) {
        alert(error.data);
      });
    }
  };

})();
