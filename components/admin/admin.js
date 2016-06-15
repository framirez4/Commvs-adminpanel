(function() {
  'use strict';

  angular.module('controller.admin', ['angular-storage', 'angular-jwt'])
    .controller('AdminPanelController', AdminPanelController)


  function AdminPanelController($scope, store, $state){
    $scope.buttons = [
      {name: 'Crear nuevo comercio', addr: 'home.main.admin.newComm'},
      {name: 'Crear nuevo administrador', addr: 'home.main.admin.newAdmin'},
      {name: 'Administrar mi zona', addr: 'home.main.admin.myArea'},
      {name: 'Administrar usuarios', addr: 'home.main.admin.users'},

    ]

  };

}());
