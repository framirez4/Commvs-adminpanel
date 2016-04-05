(function() {
  'use strict';


  angular.module( 'controller.login', [
    'angular-storage',
    'factory.auth'
  ])
  .controller( 'LoginCtrl', LoginController );

  function LoginController( $scope, $http, store, $state, AuthFactory) {

    $scope.user = {};
    $scope.$on('signupSuccess', function(event, data) {
      $scope.signupSuccess = data;
    });

    $scope.login = function() {
      //AuthFactory.auth($scope.user)
      $http({
        url: 'http://192.168.1.140:8000/authenticate',
        method: 'POST',
        data: $scope.user
      }).then(function(response) {
        if(response.data.success == true){
          store.set('jwt', response.data.token);
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
