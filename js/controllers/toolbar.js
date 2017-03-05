  'use strict'

  angular.module('controller.toolbar', [
    'angular-storage',
    'angular-jwt',
    'factory.auth'
  ])
  .controller('ToolbarController', ToolbarController)

  function ToolbarController ($rootScope, $scope, store, jwtHelper, $mdSidenav, $state, AuthFactory) {
    $scope.toggleLeft = function () {
      $mdSidenav('left').toggle()
    }

    $scope.logout = function () {
      store.remove('jwt')
      store.remove('user.role')
      store.remove('user.favs')
      store.remove('user.owns')
      store.remove('user._id')
      store.remove('user.first_name')
      store.remove('user.last_name')
      store.remove('token.created')
      delete $rootScope.first_name
      delete $rootScope.last_name
      delete $rootScope._id
      $rootScope.isLogged = false
      $rootScope.isAdmin = false
      location.reload()
      $state.go('main.comms', {}, { reload: true })
    }

    $scope.refreshToken = function () {
      AuthFactory.refresh(store.get('jwt'))
      .then(function (response) {
        if (response.data.success === true) {
          store.set('jwt', response.data.token)
          var decoded = jwtHelper.decodeToken(response.data.token)._doc
          console.log(decoded)
          store.set('token.created', Date.now())
          store.set('user.first_name', decoded.first_name)
          store.set('user.last_name', decoded.last_name)
          store.set('user._id', decoded._id)
          store.set('user.role', decoded.role)
          store.set('user.favs', decoded.favs)
          store.set('user.owns', decoded.owns)
        }
      })
    }
  };
  // store.set('token.created', Date.now());
