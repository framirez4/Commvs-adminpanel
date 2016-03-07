angular.module( 'controller.signup', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    controller: 'SignupCtrl',
    templateUrl: '../../templates/pages/signup/index.html'
  });
})
.controller( 'SignupCtrl', function SignupController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.createUser = function() {
    $http({
      url: 'https://localhost:8000/api/users',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
      store.set('jwt', response.data.id_token);
      $state.go('home');
    }, function(error) {
      alert(error.data);
    });
  }

});
