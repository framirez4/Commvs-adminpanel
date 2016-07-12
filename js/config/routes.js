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
        .state( 'main', {
          views:{
            "mainframe": {
              templateUrl: '../views/mainframe/main.html'
            },
            "toolbar": {
              templateUrl: '../../views/mainframe/toolbar.html',
              controller: 'ToolbarController'
            },
            "sidenav": {
              templateUrl: '../../views/mainframe/sidenav.html',
              controller: 'SidenavController'
            }
          }
        })
        .state( 'main.home', {
          url: '^/',
          views:{
            "": {
              templateUrl: '../views/home.html',
              controller: 'HomeController'
            }
          }
        })
        .state('main.comms', {
          url: '^/comms',
          params: {
            position: {}
          },
          templateUrl: '../views/comms.html',
          controller: 'CommsController'


        })
        .state( 'main.commDetail', {
          url: '/comms/:comm_id',
          params: {
            comm: {}
          },
          views:{
            "": {
              templateUrl: '../views/commsinfo.html',
              controller: 'CommsDetailController'
            }
          }
        })
        .state( 'main.login', {
          url: '/login',
          params: {
            dest: '',
            signupSuccess: {}
          },
          views:{
            "": {
              templateUrl: '../views/login.html',
              controller: 'LoginController'
            }
          }
        })
        .state( 'main.signup', {
          url: '/signup',
          views:{
            "": {
              templateUrl: '../views/signup.html',
              controller: 'SignupController'
            }
          }
        })
        .state( 'main.settings', {
          url: '/settings',
          views:{
            "": {
              templateUrl: '../views/settings.html',
              controller: 'SettingsController'
            }
          },
          data: { requiresLogin: true }
        })
        .state( 'main.favs', {
          url: '/favs',
          views:{
            "": {
              templateUrl: '../views/favs.html',
              controller: 'FavsController'
            }
          },
          data: { requiresLogin: true }
        })
        .state( 'main.owners', {
          views:{
            "": {
              templateUrl: '../views/owners/owners.html',
              controller: 'OwnersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state( 'main.owners.list', {
          url: '/propietarios',
          views:{
            "": {
              templateUrl: '../views/owners/commslist.html',
              controller: 'OwnersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state( 'main.owners.newprop', {
          url: '/propietarios/nuevo',
          views:{
            "": {
              templateUrl: '../views/owners/newprop.html',
              controller: 'OwnersController'
            }
          },
          data: { requiresLogin: true }
        })
        .state( 'main.owners.editor', {
          url: '/propietarios/:comm_id/editor',
          views:{
            "": {
              templateUrl: '../views/owners/commeditor.html',
              controller: 'CommEditorController'
            }
          }
        })

        .state( 'main.admin', {
          url: '^/admin',
          views:{
            "": {
              templateUrl: '../views/admin/admin.html',
              controller: 'AdminPanelController'
            }
          }
        })
        .state( 'main.admin.signupadmin', {
          url: '/signupadmin',
          views:{
            "": {
              templateUrl: '../views/admin/signup.html',
              controller: 'SignupAdminController'
            }
          }
        })
        .state( 'main.admin.users', {
          url: '/users',
          views:{
            "": {
              templateUrl: '../views/admin/users.html',
              controller: 'UsersController'
            }
          }
        })
        .state( 'main.admin.comm_creator', {
          url: '/comm_creator',
          params: {
            comm_id: ''
          },
          views:{
            "": {
              templateUrl: '../views/admin/commeditor.html',
              controller: 'CommEditorController'
            }
          }
        })
        .state( 'main.admin.myZone', {
          url: '/mi_zona',
          views:{
            "": {
              templateUrl: '../views/admin/myzone.html',
              controller: 'myZoneController'
            }
          }
        });
/*
      $stateProvider
        // Login frame. includes a :dest if specified to redirect after logging in.
        .state('login', {
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
*/
        //$locationProvider.html5Mode({
        //  enabled: true,
        //  requireBase: false
        //});
    });


})();
