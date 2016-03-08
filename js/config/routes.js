(function() {
  'use strict';

  angular.module('config.routes', [
    'ui.router',
    'controller.home',
    'controller.login',
    'controller.signup'
  ])
    .config(function( $stateProvider, $urlRouterProvider ) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '../templates/pages/home/index.html',
          controller: 'HomeCtrl',
          data: {
            requiresLogin: true
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: '../templates/pages/login/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '../templates/pages/login/signup.html',
          controller: 'SignupCtrl'
        });
    });


})();
