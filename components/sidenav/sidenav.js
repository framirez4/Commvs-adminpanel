(function() {
  'use strict';

  angular.module( 'controller.sidenav', [
    'angular-storage',
    'angular-jwt'
  ])
  .controller('SidenavController', SidenavController);

// Controller for left panel
function SidenavController ($scope, $mdSidenav, $state) {

  $scope.sections = [
    {icon: 'store', name:'Comercios', state: 'home.main.comms.list' },
    {icon: 'star', name: "Favoritos", state: 'home.main.favs.list' },
    {icon: 'card_giftcard', name: "Promociones", state: 'home.main.promos' },
    {icon: 'verified_user', name: "Soy Propietario", state: 'home.main.owners.list' },
    {icon: 'settings', name: "Configuracion", state: 'home.main.settings' },
    {icon: 'account_box', name: "Administrar usuarios", state: 'home.main.users' }
  ];



  $scope.close = function () {
    if($mdSidenav('left').isOpen()){
      $mdSidenav('left').close();
    }
  };
};

}());
