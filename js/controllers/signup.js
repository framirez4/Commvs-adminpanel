(function() {
  'use strict';

  angular.module( 'controller.signup', [
    'angular-storage',
    'kapeloi.config'
  ])
  .controller( 'SignupController', SignupController);


  function SignupController( $scope, $rootScope, $http, store, $state, UserFactory ) {
    if(store.get("jwt")) $state.go('main.comms');
    $scope.user = {};

    $scope.createUser = function() {
      UserFactory.add($scope.user)
      .then(function(response) {
        console.log(response);
        if(response.data.success == false){
          $scope.signupErr = response.data.message;
          console.log($scope.signupErr)
        } else {
          $state.go('main.login', {signupSuccess: response.data});
        }

      }, function(error) {
        alert(error.data);
      });
    };
  };

})();
