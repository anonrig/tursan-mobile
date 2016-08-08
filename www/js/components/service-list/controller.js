(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('ServiceListController', ServiceListController);


  /**
   * Dependencies.
   */
  ServiceListController.$inject = [
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
  function ServiceListController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};
    $scope.vm.items = [];

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    $http
      .get('http://ws1.tursan.net/GetPlatesListByFirmID.ashx?firmID=' + $localStorage.userName)
      .success(function(response) {
        $scope.vm.items = _.sortBy(response, ['plate']);
        $ionicLoading.hide();
      });

    $scope.go = function(item) {
      $localStorage.tempServiceList = item.Plate;

      $state.go('tab.service-list-detail')
    };
  };
})();
