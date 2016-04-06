(function() {
  'use strict';

  angular.module( 'app', [
    'ngMaterial',
    'ngMessages',
    'config.routes',
    'config.interceptors',
    'angular-storage',
    'factory.comm',
    'factory.user'
  ])
  .run( function($rootScope, $state, store, jwtHelper) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
      if( to.data && to.data.requiresLogin ) {
        if( !store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
          e.preventDefault();
          $state.go('login');
        }
      }
    });
  })
  .controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
    $scope.$on('$routeChangeSuccess', function(e, to) {
      if( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
        $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Commvs - adminpanel';
      }
    });
  });

})();
