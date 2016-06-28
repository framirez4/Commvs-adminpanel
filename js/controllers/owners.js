(function() {
  'use strict';

  angular.module( 'controller.owners', [
    'angular-storage',
    'angular-jwt',
    'factory.own',
    'factory.comm',
    'factory.search',
    'factory.favs',
    'factory.auth'

  ])
  .controller('OwnersController', OwnersController);


  function OwnersController( $scope, $http, store, jwtHelper, $mdDialog, $state, $stateParams, OwnershipFactory, CommFactory, FavFactory, SearchFactory, AuthFactory) {
    $scope.jwt  = store.get('jwt');
    $scope.role = store.get('user.role');
    $scope.favs = store.get('user.favs');
    $scope.owns = store.get('user.owns');

    $scope.getOwns = function() {
      var ownsLength = $scope.owns.length;
      $scope.comms = [];
      for(var i = 0; i < ownsLength; i++){
        CommFactory.comm($scope.owns[i])
        .then(function(res) {
          $scope.comms.push(res.data);
        });
      }
    };

    $scope.submitCode = function (){
      OwnershipFactory.post(store.get('jwt'), $scope.selectedItem._id, $scope.owner.code)
      .then(function(res){
        AuthFactory.refresh(store.get("jwt"))
        .then(function(response){
          if(response.data.success == true){
            store.set('jwt', response.data.token);
            var decoded = jwtHelper.decodeToken(response.data.token)._doc;
            console.log(decoded);
            store.set('token.created', Date.now());
            store.set('user.first_name', decoded.first_name);
            store.set('user.last_name', decoded.last_name);
            store.set('user._id', decoded._id);
            store.set('user.role', decoded.role);
            store.set('user.favs', decoded.favs);
            store.set('user.owns', decoded.owns);
          }
        });

        $scope.owns.push(res.data.added);
        store.set('user.owns', $scope.owns);
        $scope.getOwns();
        console.log(res);
        $state.go('main.owners.list')
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
