(function() {
  'use strict';

  angular.module('controller.commeditor', [
    'angular-storage',
    'angular-jwt',
    'factory.comm'
  ])
  .controller('CommEditorController', CommEditorController);

  function CommEditorController($rootScope, $scope, store, $state, $stateParams, CommFactory ){
    $scope.editComm = {};

    console.log($stateParams);
    if($stateParams.comm_id.length) {
      CommFactory.comm($stateParams.comm_id)
      .then(function(res){
        console.log(res.data);
        $scope.editComm = res.data;
      });
    }

    $scope.editData = function() {
      CommFactory.edit(store.get("jwt"), $stateParams.comm_id, $scope.editComm)
      .then(function(res){
        console.log(res.data);
        if (res.data.success) {
          $scope.editSuccess = 'Datos modificados correctamente';
        }
      })
    };

    $scope.addComm = function() {
      console.log($scope.newcomm);
      CommFactory.add(store.get('jwt'), $scope.newComm)
      .then(function(res) {
        if(res.data.success){
          console.log(res.data);
          $scope.addSuccess = 'Comercio añadido correctamente'
        }
      })
    };
  }
})();
