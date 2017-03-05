  'use strict'

  angular.module('controller.commdetail', [
    'angular-storage',
    'angular-jwt',
    'factory.favs',
    'factory.comm',
    'factory.user',
    'factory.own'
  ])
  .controller('CommsDetailController', CommsDetailController)

  function CommsDetailController ($rootScope, $scope, $http, store, jwtHelper, UserFactory, CommFactory, FavFactory, OwnershipFactory, $mdDialog, $state, $stateParams) {
    $scope.jwt = store.get('jwt')

    $scope.getComm = function (comm) {
      CommFactory.comm(comm)
      .then(function (res) {
        $scope.commDetail = res.data
      })
    }

    // $scope.toggleStar = function(id) {
    //   // if id not in user favs
    //   var index = $scope.favs.indexOf(id)
    //   if(index == -1) {
    //     FavFactory.add(store.get('jwt'), {'comm_id': id })
    //     .then(function(data){
    //       $scope.favs.push(id);
    //       store.set('user.favs', $scope.favs);
    //       console.log(data.data.message);
    //     });
    //   } else {
    //     FavFactory.delete(store.get('jwt'), {'comm_id': id })
    //     .then(function(data){
    //       $scope.favs.splice(index, 1);
    //       store.set('user.favs', $scope.favs);
    //       console.log(data.data.message);
    //     });
    //   }
    // };

    console.log($rootScope.favs)
    $scope.toggleStar = function (id) {
      // if id not in user favs
      var index = $rootScope.favs.indexOf(id)
      if (index === -1) {
        FavFactory.add(store.get('jwt'), {'comm_id': id})
        .then(function (res) {
          if (res.data.success) {
            $rootScope.favs.push(id)
            store.set('user.favs', $rootScope.favs)
            console.log(res.data)
          }
        })
      } else {
        FavFactory.delete(store.get('jwt'), {'comm_id': id})
        .then(function (res) {
          if (res.data.success) {
            $rootScope.favs.splice(index, 1)
            store.set('user.favs', $rootScope.favs)
            console.log(res.data)
          }
        })
      }
    }

    if ($stateParams.comm._id) {
      console.log('Reading params data')
      $scope.commDetail = $stateParams.comm
    } else {
      console.log('Getting comm data...')
      $scope.getComm($stateParams.comm_id)
    }
  }
