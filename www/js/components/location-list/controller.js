(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('LocationListController', LocationListController);


  /**
   * Dependencies.
   */
  LocationListController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory',
    '$ionicLoading'
  ];


  /**
   * Controller.
   */
  function LocationListController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading) {
    $scope.vm = {};
    $scope.vm.items = [];

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    ApiFactory
      .getLocationList({
        userName: $localStorage.userName,
        userPassword: $localStorage.password,
        firmID: $localStorage.userName
      })
      .then(function(res) {
        res = res.split('_##_')

        res.forEach(function(item) {
          $scope.vm.items.push({
            name: item.split('_#_')[0],
            number: item.split('_#_')[1]
          });
        });
        $scope.vm.items = _.sortBy($scope.vm.items, ['name', 'number'])

        $ionicLoading.hide();
      })
      .catch(function(err) {
        console.error('err', err);
        $ionicLoading.hide();
      });


    $scope.go = function(item) {
      $localStorage.tempLocationList = item.name;

      $state.go('tab.location-list-detail');
    };
  };
})();
