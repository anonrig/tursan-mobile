(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('LocationListDetailController', LocationListDetailController);


  /**
   * Dependencies.
   */
  LocationListDetailController.$inject = [
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
  function LocationListDetailController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading) {
    $scope.vm = {};
    $scope.vm.items = [];
    $scope.vm.location = $localStorage.tempLocationList;

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    ApiFactory
      .getRouteDetails({
        userName: $localStorage.userName,
        userPassword: $localStorage.password,
        firmID: $localStorage.userName,
        destination: $localStorage.tempLocationList,
        ArventoCode: 'tursanpersonelweb',
        ArventoPass1: 'asasasas',
        ArventoPass2: 'asasasas'
      })
      .then(function(res) {
        res = res.split('_##_')

        res.forEach(function(item) {
          $scope.vm.items.push(item.split('_#_'));
        });

        $ionicLoading.hide();
      })
      .catch(function(err) {
        console.error('Err', err);
        $ionicLoading.hide();
      });

    $scope.go = function(item) {
      $localStorage.tempServiceList = item;

      $state.go('tab.service-list-detail')
    };
  };
})();
