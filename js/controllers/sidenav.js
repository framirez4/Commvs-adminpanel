(function() {
  'use strict';

  angular.module( 'controller.sidenav', [
    'angular-storage',
    'angular-jwt'
  ])
  .controller('SidenavController', SidenavController);

// Controller for left panel
function SidenavController ($rootScope, $scope, $mdSidenav, $state, store) {

  if(store.get('jwt') && store.get('user.role') === 'admin'){
    $scope.sections = [
      {icon: 'account_box', name: "Inicio", state: 'main.admin', logged: true },
      {icon: 'store', name: 'Crear nuevo comercio', state: 'main.admin.comm_creator', logged: true },
      {icon: 'account_box', name: 'Crear nuevo administrador', state: '#', logged: true},
      {icon: 'store', name: 'Administrar mi zona', state: 'main.admin.myZone', logged: true},
      {icon: 'account_box', name: 'Administrar usuarios', state: 'main.admin.users', logged: true},
      {icon: 'settings', name: "Configuracion", state: 'main.settings', logged: true }
    ]
  } else {
    $scope.sections = [
    {icon: 'store', name:'Comercios cercanos', state: 'main.comms', logged: false },
    //{icon: 'card_giftcard', name: "Promociones", state: 'home.main.promos', logged: false },
    {icon: 'star', name: "Favoritos", state: 'main.favs', logged: false },
    {icon: 'verified_user', name: "Soy Propietario", state: 'main.owners.list', logged: false },
    {icon: 'settings', name: "Configuracion", state: 'main.settings', logged: true }
  ];
  }



  $scope.close = function () {
    if($mdSidenav('left').isOpen()){
      $mdSidenav('left').close();
    }
  };
};

}());
