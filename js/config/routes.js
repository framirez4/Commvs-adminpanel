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
        .state('login', { // Login frame. includes a :dest if specified to redirect after logging in.
          url: '/login/:dest',
          views: {
            "":{
              templateUrl: '../components/login/login.html',
              controller: 'LoginController'
            }
          }
        })

        // Signup form page.
        .state('signup', {
          url: '/signup',
          views: {
            "":{
              templateUrl: '../components/signup/signup.html',
              controller: 'SignupController'
            }
          }
        })


        // Main frame
        // Contains home.main, all pages apply here.
        // Includes Toolbar view and Sidenav views.
        .state('home', {
          templateUrl: '../components/home/home.html',
          controller: 'HomeController'
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

        // Comms main frame
        .state('home.main.comms', {
          url: 'comms',
          views:{
            "": {
              templateUrl: '../components/comms/comms.html',
              controller: 'CommsController'
            }
          }
        })
        .state('home.main.comms.comm', {
          url: '/:comm',
          views:{
            "": {
              templateUrl: '../components/comms/commsinfo.html',
              controller: 'CommsDetailController'
            }
          }
        })

        // Favs main frame
        .state('home.main.favs', {
          url: 'favs',
          views:{
            "": {
              templateUrl: '../components/favs/favs.html',
              controller: 'FavsController'
            }
          },
          data: { requiresLogin: true }
        })

        // Promos main frame
        .state('home.main.promos', {
          url: 'promos',
          views:{
            "": {
              templateUrl: '../components/promos/promos.html',
              controller: 'PromosController'
            }
          }
        })

      // Owners main frame
        .state('home.main.owners', {
          url: 'owners',
          views:{
            "": {
              templateUrl: '../components/owners/owners.html',
              controller: 'OwnersController'
            }
          },
          data: { requiresLogin: true }
        })


        .state('home.main.owners.newprop', {
          url: '/add_new',
          views:{
            "": {
              templateUrl: '../components/owners/newprop.html',
              controller: 'OwnersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state('home.main.owners.list', {
          url: '/list',
          views:{
            "": {
              templateUrl: '../components/owners/commslist.html',
              controller: 'OwnersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state('home.main.owners.editor', {
          url: '/:comm/editor',
          views:{
            "": {
              templateUrl: '../components/owners/commeditor.html',
              controller: 'CommsController'
            }
          },
          data: { requiresLogin: true }
        })

      // Account settings tab
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


      // Admin tabs

        .state('home.main.admin', {
          url: 'admin',
          views:{
            "": {
              templateUrl: '../components/admin/admin.html',
              controller: 'AdminPanelController'
            }
          },
          data: { requiresLogin: true }
        })
        .state('home.main.admin.users', {
          url: '/users',
          views:{
            "": {
              templateUrl: '../components/users/users.html',
              controller: 'UsersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state('home.main.admin.comm_creator', {
          url: '/comm_creator',
          views: {
            "": {
              templateUrl: '../components/comms/commscreate.html',
              controller: 'CommsController'
            }
          }
        })
        .state('home.main.admin.my_zone', {
          url: '/mi_zona',
          views: {
            "": {
              templateUrl: '../components/admin/myzone.html',
              controller: 'CommsController'
            }
          }
        })

        //$locationProvider.html5Mode({
        //  enabled: true,
        //  requireBase: false
        //});
    });


})();
