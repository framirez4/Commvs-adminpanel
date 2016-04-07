(function() {
  'use strict';

  angular.module( 'controller.home', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own'


  ])
  .controller('HomeCtrl', HomeController)
  .controller('LeftCtrl', LeftCtrl);


  function HomeController( $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, $mdSidenav, $mdDialog, $state) {

    $scope.jwt = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');


    $scope.toggleLeft = function(){ $mdSidenav('left').toggle(); };


    $scope.logout = function(){
      localStorage.clear();
      $state.go('login');
    };



    $scope.getUsers = function(){
      UserFactory.get($scope.jwt)
      .then(function(data) {
        $scope.users = data.data;
      });
    }

    $scope.deleteUser = function(email) {
      UserFactory.delete($scope.jwt, {'email': email })
      .then(function(data) {
        $scope.getUsers();
      })
    }



    $scope.getComms = function() {
      CommFactory.get()
      .then(function(data) {
        $scope.comms = data.data;
      });
    }
    $scope.addComm = function() {
      console.log($scope.newcomm);
      CommFactory.add($scope.jwt, $scope. newcomm)
      .then(function(data) {
        $scope.getComms();
      })
    };

    $scope.deleteComm = function(id) {
      CommFactory.delete($scope.jwt, id)
      .then(function(data) {
        $scope.getComms();
      });
    };

    $scope.toggleStar = function(id) {
      // if id not in user favs
      var index = $scope.favs.indexOf(id)
      if(index == -1) {
        FavFactory.add($scope.jwt, {'comm_id': id })
        .then(function(data){
          $scope.favs.push(id);
          store.set('user.favs', $scope.favs);
          console.log(data.data.message);
        });
      } else {
        FavFactory.delete($scope.jwt, {'comm_id': id })
        .then(function(data){
          $scope.favs.splice(index, 1);
          store.set('user.favs', $scope.favs);
          console.log(data.data.message);
        });
      }

    };

    $scope.getOwnerkey = function(id, ev) {
      OwnershipFactory.get($scope.jwt, id)
      .then(function(data){
        console.log(data.data);
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Ownership key for ' + data.data.name)
              .textContent('Key: ' + data.data.ownership.key)
              .ariaLabel('Ownership dialog')
              .ok('Got it!')
              .targetEvent(ev)
          );

      });
    };



    $scope.getUsers();
    $scope.getComms();


  }; // HomeCtrl end






  // Controller for left panel
  function LeftCtrl ($scope, $mdSidenav, UserFactory) {
    $scope.close = function () {
      $mdSidenav('left').close();
    };

    $scope.changePass = function(){
      UserFactory.put($scope.jwt, $scope.user_ch)
      .then(function(data) {
        if (data.data.success === false) {
          $scope.passch = data.data.message;
        } else if(data.data.success === true) {
          $scope.passch = data.data.message;
        }

      });
    }
  };


})();
