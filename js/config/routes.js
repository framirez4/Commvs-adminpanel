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
          url: '/',
          templateUrl: '../templates/home/index.html',
          controller: 'HomeCtrl',
          data: {
            requiresLogin: true
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: '../templates/login/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '../templates/login/signup.html',
          controller: 'SignupCtrl'
        });

        //$locationProvider.html5Mode(true);
    });


})();
