(function() {
  'use strict';


  angular.module( 'controller.login', [
    'angular-storage'
  ])
  .controller( 'LoginCtrl', LoginController );

  function LoginController( $scope, $http, store, $state) {

    $scope.user = {};
    $scope.$on('signupSuccess', function(event, data) {
      $scope.signupSuccess = data;
    });

    $scope.login = function() {
      $http({
        url: 'https://localhost:8000/api/authenticate',
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
