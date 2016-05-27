(function() {
  'use strict';

  angular.module('config.routes', [
    'ui.router',
    'controller.home',
    'controller.login',
    'controller.signup'
  ])
    .config(function( $stateProvider, $urlRouterProvider, $locationProvider ) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          templateUrl: '../components/home/home.html'
        })
        .state('home.main', {
          url: '/',
          views:{
            "": {
              templateUrl: '../components/home/main.html'
            },
            "toolbar":{
              templateUrl: '../components/toolbar/toolbar.html',
              controller: 'ToolbarController'
            },
            "sidenav":{
              templateUrl: '../components/sidenav/sidenav.html',
              controller: 'SidenavController'
            }
          }
        })
        .state('home.main.comms', {
          views:{
            "": {
              templateUrl: '../components/comms/comms.html',
              controller: 'CommsController'
            }
          }
        })
        .state('home.main.comms.list', {
          url: 'comms',
          views:{
            "": {
              templateUrl: '../components/comms/commslist.html'
            }
          }
        })
        .state('home.main.favs', {
          views:{
            "": {
              templateUrl: '../components/favs/favs.html',
              controller: 'FavsController'
            }
          }
        })
        .state('home.main.favs.list', {
          url: 'favs',
          views:{
            "": {
              templateUrl: '../components/comms/commslist.html'
            }
          }
        })
        .state('home.main.promos', {
          url: 'promos',
          views:{
            "": {
              templateUrl: '../components/promos/promos.html',
              controller: 'PromosController'
            }
          }
        })
        .state('home.main.owners', {
          url: 'owners',
          views:{
            "": {
              templateUrl: '../components/owners/owners.html',
              controller: 'OwnersController'
            }
          }
        })
        .state('home.main.owners.newprop', {
          url: '/add_new',
          views:{
            "": {
              templateUrl: '../components/owners/newprop.html',
              controller: 'OwnersController'
            }
          }
        })
        .state('home.main.owners.list', {
          url: '/list',
          views:{
            "": {
              templateUrl: '../components/owners/commslist.html',
              controller: 'OwnersController'
            }
          }
        })
        .state('home.main.settings', {
          url: 'settings',
          views:{
            "": {
              templateUrl: '../components/settings/settings.html',
              controller: 'SettingsController'
            }
          },
          data: { requiresLogin: true }
        })
        .state('home.main.users', {
          url: 'users',
          views:{
            "": {
              templateUrl: '../components/users/users.html',
              controller: 'UsersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state('login', {
          url: '/login/:dest',
          views: {
            "":{
              templateUrl: '../components/login/login.html',
              controller: 'LoginController'
            }
          }
        })
        .state('signup', {
          url: '/signup',
          views: {
            "":{
              templateUrl: '../components/signup/signup.html',
              controller: 'SignupController'
            }
          }
        });

        //$locationProvider.html5Mode({
        //  enabled: true,
        //  requireBase: false
        //});
    });


})();
