(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('IsArrivedController', IsArrivedController);


  /**
   * Dependencies.
   */
  IsArrivedController.$inject = [
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
  function IsArrivedController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};
    $scope.vm.items = [];

    $ionicLoading.show({
      template: 'Yükleniyor...'
    });

    $scope.refresh = function() {
      $ionicLoading.show({
        template: 'Yükleniyor...'
      });

      $http.post('http://ws1.tursan.net/HasDeviceControl.aspx/HasDevice', {
        param: $localStorage.userName
      }).success(function(response) {
        var elements = JSON.parse(response.d);

        var active = _.sortBy(_.filter(elements, ['HasDevice', true]), ['ServiceNo']);
        var nonActive = _.sortBy(_.filter(elements, ['HasDevice', false]), ['ServiceNo']);

        $scope.vm.items = [].concat(active).concat(nonActive);
        $ionicLoading.hide();
      });
    };

    $scope.refresh();

    $scope.go = function(item) {
      $localStorage.tempServiceList = item.Plate;

      $state.go('tab.service-list-detail')
    };
  };
})();
