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
    '$ionicFilterBar',
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
  function LocationListController($scope, $ionicFilterBar, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};
    $scope.vm.items = [];

    var filterBarInstance;

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });


    $http
      .get('http://ws1.tursan.net/GetEndListHandler.ashx?firmID=' + $localStorage.userName)
      .success(function(response) {
        console.log('response', response);

        $scope.vm.items = _.sortBy(response, ['Route', 'ServiceCount']);

        $ionicLoading.hide();
      });


    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.vm.items,
        update: function (filteredItems, filterText) {
          $scope.vm.items = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

    $scope.refreshItems = function () {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }
    };

    $scope.go = function(item) {
      $localStorage.tempLocationList = item.Route;

      $state.go('tab.location-list-detail');
    };
  };
})();
