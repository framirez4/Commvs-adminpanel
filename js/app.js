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
    'controller.favs'
  ])
  .run( function($rootScope, store, jwtHelper, $state) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function(e, to) {
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
