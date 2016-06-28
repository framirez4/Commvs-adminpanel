(function() {
  'use strict';

angular.module( 'controller.settings', [
  'angular-storage',
  'angular-jwt'
])
.controller('SettingsController', SettingsController);


function SettingsController($scope, store, UserFactory ) {
  $scope.changeName = function(){
    UserFactory.meprof(store.get("jwt"), $scope.user_chn)
    .then(function(res){
      if(res.data.success){
        console.log(res.data);
        if($scope.user_chn.first_name) store.set("user.first_name", $scope.user_chn.first_name);
        if($scope.user_chn.last_name) store.set("user.last_name", $scope.user_chn.last_name);
        $scope.dataChange = 'Datos actualizados correctamente.';
      } else {
        $scope.dataFail = 'Error al actualizar los datos.';
      }
    })
  }



  $scope.changePass = function(){
    UserFactory.mepass(store.get("jwt"), $scope.user_chp)
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
