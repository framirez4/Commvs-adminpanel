(function() {
  'use strict';

angular.module( 'controller.settings', [
  'angular-storage',
  'angular-jwt'
])
.controller('SettingsController', SettingsController);


function SettingsController($scope, UserFactory ) {
  $scope.changePass = function(){
    UserFactory.put($scope.jwt, $scope.user_ch)
    .then(function(data) {
      if (data.data.success === false) {
        $scope.passch = data.data.message;
      } else if(data.data.success === true) {
        $scope.passch = data.data.message;
      }

    });
  }
};

}());
