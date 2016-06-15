(function() {
  'use strict';

  angular.module( 'kapeloi', [
    'ngMaterial',
    'ngMessages',
    'config.routes',
    'config.interceptors',
    'angular-storage',
    'controller.home',
    'controller.login',
    'controller.signup',
    'controller.toolbar',
    'controller.sidenav',
    'controller.settings',
    'controller.comms',
    'controller.users',
    'controller.promos',
    'controller.owners',
    'controller.favs',
    'controller.admin',
    'controller.commdetail'
  ])
  .run( function($rootScope, jwtHelper, $state, store) {
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function(e, to) {
      //Get user general data to show in menus
      $rootScope.isLogged = false;
      $rootScope.isAdmin = false;
      if(store.get('jwt')){
        $rootScope.isLogged = true;
        $rootScope.first_name = store.get('user.first_name');
        $rootScope.last_name = store.get('user.last_name');
        $rootScope._id = store.get('user._id');
        if(store.get('user.role') === 'admin') $rootScope.isAdmin = true;
      }


      if( to.data && to.data.requiresLogin ) {
        if( !store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
          e.preventDefault();
          $state.go('login', { dest: to.name });
        }
      }
    });
  })
  .controller( 'AppController', ['$scope', '$location', AppController]);


  function AppController ($scope, $location, $state) {
    $scope.$on('$routeChangeSuccess', function(e, to) {
      if( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
        $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Kapeloi';
      }
    });
  };

})();
