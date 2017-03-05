  'use strict'

  angular.module('controller.admin', ['angular-storage', 'angular-jwt'])
    .controller('AdminPanelController', AdminPanelController)

  function AdminPanelController ($scope, store, $state) {
    $scope.buttons = [
      {name: 'Crear nuevo comercio', addr: 'main.admin.comm_creator'},
      {name: 'Crear nuevo administrador', addr: 'main.admin.signupadmin'},
      {name: 'Administrar mi zona', addr: 'main.admin.myZone'},
      {name: 'Administrar usuarios', addr: 'main.admin.users'}
    ]
  }
