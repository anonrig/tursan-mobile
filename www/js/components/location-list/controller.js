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
          $scope.vm.items.push(item.split('_#_'));
        });

        $ionicLoading.hide();
      })
      .catch(function(err) {
        console.error('err', err);
        $ionicLoading.hide();
      });


    $scope.go = function(item) {
      $localStorage.tempLocationList = item[0];

      $state.go('tab.location-list-detail');
    };
  };
})();
