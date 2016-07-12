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
      {icon: 'account_box', name: 'Crear nuevo administrador', state: 'main.admin.signupadmin', logged: true},
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


  $scope.logout = function(){
    store.remove('jwt');
    store.remove('user.role');
    store.remove('user.favs');
    store.remove('user.owns');
    store.remove('user._id');
    store.remove('user.first_name');
    store.remove('user.last_name');
    store.remove('token.created');
    delete $rootScope.first_name;
    delete $rootScope.last_name;
    delete $rootScope._id;
    $rootScope.isLogged = false;
    $rootScope.isAdmin = false;
    location.reload();
    $state.go('main.comms', {}, { reload: true });
  };
  
  $scope.close = function () {
    if($mdSidenav('left').isOpen()){
      $mdSidenav('left').close();
    }
  };
};

}());
