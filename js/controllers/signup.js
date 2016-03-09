(function() {
  'use strict';

  angular.module( 'controller.signup', [
    'angular-storage'
  ])
  .controller( 'SignupCtrl', SignupController);


  function SignupController( $scope, $rootScope, $http, store, $state, UserFactory) {

    $scope.user = {};

    $scope.createUser = function() {
      /*$http({
        url: 'https://localhost:8000/api/users',
        method: 'POST',
        data: $scope.user
      })*/
      UserFactory.add($scope.user)
      .then(function(response) {
        if(response.data.success == false){
          $scope.signupErr = response.data.message;
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
