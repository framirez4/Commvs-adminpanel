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
      {icon: 'account_box', name: "Inicio", state: 'home.main.admin', logged: true },
      {icon: 'store', name: 'Crear nuevo comercio', state: 'home.main.admin.comm_creator', logged: true },
      {icon: 'account_box', name: 'Crear nuevo administrador', state: '#', logged: true},
      {icon: 'store', name: 'Administrar mi zona', state: 'home.main.admin.my_zone', logged: true},
      {icon: 'account_box', name: 'Administrar usuarios', state: 'home.main.admin.users', logged: true},
      {icon: 'settings', name: "Configuracion", state: 'home.main.settings', logged: true }
    ]
  } else {
    $scope.sections = [
    {icon: 'store', name:'Comercios', state: 'home.main.comms', logged: false },
    {icon: 'card_giftcard', name: "Promociones", state: 'home.main.promos', logged: false },
    {icon: 'star', name: "Favoritos", state: 'home.main.favs', logged: false },
    {icon: 'verified_user', name: "Soy Propietario", state: 'home.main.owners.list', logged: false },
    {icon: 'settings', name: "Configuracion", state: 'home.main.settings', logged: true }
  ];
  }



  $scope.close = function () {
    if($mdSidenav('left').isOpen()){
      $mdSidenav('left').close();
    }
  };
};

}());
