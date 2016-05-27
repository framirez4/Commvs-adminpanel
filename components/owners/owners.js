(function() {
  'use strict';

  angular.module( 'controller.owners', [
    'angular-storage',
    'angular-jwt',
    'factory.own',
    'factory.comm',
    'factory.search',
    'factory.favs'

  ])
  .controller('OwnersController', OwnersController);


  function OwnersController( $scope, $http, store, jwtHelper, $mdDialog, $state, $stateParams, OwnershipFactory, CommFactory, FavFactory, SearchFactory) {
    $scope.jwt  = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');
    $scope.owns = store.get('user.owns');

    $scope.getOwns = function() {
      var ownsLength = $scope.owns.length;
      $scope.comms = [];
      for(var i = 0; i < ownsLength; i++){
        console.log($scope.owns[i]);
        CommFactory.comm($scope.owns[i])
        .then(function(res) {
          $scope.comms.push(res.data);
        });
      }
    };

    $scope.submitCode = function (){
      OwnershipFactory.post(store.get('jwt'), $scope.selectedItem._id, $scope.owner.code)
      .then(function(res){
        $scope.owns.push(res.data.added);
        store.set('user.owns', $scope.owns);
        $scope.getOwns();
        console.log(res);
        $state.go('home.main.owners.list')
      });
    };

    $scope.deleteCode = function (id){
      OwnershipFactory.delete(store.get('jwt'), id)
      .then(function(res){
        $scope.owns.pop(res.data.removed);
        store.set('user.owns', $scope.owns);
        $scope.getOwns();
      });
    };

    $scope.getOwnerkey = function(id, ev) {
      OwnershipFactory.get(store.get('jwt'), id)
      .then(function(data){
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

    //---------------------------------------------------AUTOCOMPLETE
    var self = this;

    $scope.searchData = null
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.noCache= true;
    $scope.searchLoc = "";

    $scope.querySearch = function  (query) {
      if($scope.searchLoc.length > 2){
        SearchFactory.get({ name: query, loc: $scope.searchLoc })
          .then(function(data){
            console.log(data);
            $scope.searchData = [];
            $scope.searchData = data
          })
          .catch(function(err){
            console.log(err);
          })
        };
      }
    $scope.searchTextChange = function (text) {
      if($scope.searchLoc.length > 2)
        $log.info('Text changed to ' + text);
    }
  // --------------------------------------------------------- /AUTOCOMPLETE


    $scope.getOwns();
  };
})();
