(function() {
  'use strict';

  angular.module( 'controller.signup', [
    'angular-storage',
    'kapeloi.config'
  ])
  .controller( 'SignupCtrl', SignupController);


  function SignupController( $scope, $rootScope, $http, store, $state, UserFactory) {
    $scope.user = {};

    $scope.createUser = function() {
      UserFactory.add($scope.user)
      .then(function(response) {
        if(response.data.success == false){
          $scope.signupErr = response.data.message;
          console.log($scope.signupErr)
        } else {
          $rootScope.$emit('signupSuccess', response.data.message);
          $scope.signupSuccess = response.data.message;
          $state.go('login');
        }

      }, function(error) {
        alert(error.data);
      });
    };
  };

})();
