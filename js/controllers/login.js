  'use strict'

  angular.module('controller.login', [
    'angular-storage',
    'angular-jwt',
    'factory.auth'
  ])
  .controller('LoginController', LoginController)

  function LoginController ($rootScope, $scope, $http, jwtHelper, store, $state, AuthFactory, $stateParams) {
    if (store.get('jwt')) $state.go('main.comms')

    $scope.user = {}

    // If user comes from signup, get success message to show.
    if ($stateParams.signupSuccess.message) $scope.signupSuccess = $stateParams.signupSuccess.message.es

    $scope.login = function () {
      AuthFactory.auth($scope.user)
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
          store.set('user.loc', decoded.loc)
          // if user is an admin, go to main.admin, else main.comms:
          if (store.get('user.role') === 'admin') {
            $stateParams.dest = 'main.admin'
          } else if (!$stateParams.dest) {
            $stateParams.dest = 'main.comms'
          }
          $state.go($stateParams.dest, {}, {reload: true})
        } else {
          $scope.loginErr = response.data.message
        }
      }, function (error) {
        window.alert(error.data)
      })
    }
  }
