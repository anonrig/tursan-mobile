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
    '$ionicLoading',
    '$http'
  ];


  /**
   * Controller.
   */
  function LocationListDetailController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};
    $scope.vm.items = [];
    $scope.vm.location = $localStorage.tempLocationList;

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    $http
      .get('http://ws1.tursan.net/GetPlatesHandler.ashx?station=' + $localStorage.tempLocationList + "&firmID="+$localStorage.userName)
      .success(function(response) {
        console.log('response', response);

        $scope.vm.items = response;

        $ionicLoading.hide();
      });

    $scope.go = function(item) {
      $localStorage.tempServiceList = item.Plate;

      $state.go('tab.service-list-detail')
    };
  };
})();
