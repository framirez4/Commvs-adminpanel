(function() {
  'use strict';

  angular.module( 'controller.signupadmin', [
    'angular-storage',
    'kapeloi.config'
  ])
  .controller( 'SignupAdminController', SignupAdminController);


  function SignupAdminController( $scope, $rootScope, store, $state, UserFactory ) {
    $scope.user = {};

    $scope.createAdmin = function() {
      UserFactory.add($scope.user)
      .then(function(response) {
        console.log(response);
        if(response.data.success == false){
          $scope.signupErr = response.data.message;
          console.log($scope.signupErr)
        } else {
          $scope.signupSuccess = response.data.message.es;
        }

      }, function(error) {
        alert(error.data);
      });
    };
  };

})();
