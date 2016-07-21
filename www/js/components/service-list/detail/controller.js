(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('ServiceListDetailController', ServiceListDetailController);


  /**
   * Dependencies.
   */
  ServiceListDetailController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory',
    '$http'
  ];


  /**
   * Controller.
   */
  function ServiceListDetailController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $http) {
    $scope.vm = {};
    $scope.vm.item = $localStorage.tempServiceList;
    $scope.vm.locations = $scope.vm.item[5].split(',');
    $scope.map = { center: {latitude: 41.100395, longitude: 28.998144}, zoom: 8 };
    $scope.options = {
      mapTypeControl: false,
      draggable: false
    };

    $scope.vm.vehicle = {
      address: 'Yükleniyor...'
    };

    $scope.vm.locations = $scope.vm.locations.filter(function(item, pos) {
      return $scope.vm.locations.indexOf(item) == pos;
    });

    $http.post('http://ws1.tursan.net/GetCurrentLoc.aspx/GetCurrentLocByParam', {
      param: $scope.vm.item[3]
    }).success(function(response) {
      var resp = JSON.parse(response.d);

      $scope.vm.vehicle.latitude = resp.Latitude;
      $scope.vm.vehicle.longtitude = resp.Longtitude;
      $scope.vm.vehicle.address = resp.Address;

      $scope.vm.marker = {
        id: Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
        coords: {
          latitude: resp.Latitude.replace(",", "."),
          longitude: resp.Longtitude.replace(",", ".")
        }
      };

      $scope.map = {
        center: {
          latitude: parseFloat(resp.Latitude.replace(",", ".")),
          longitude: parseFloat(resp.Longtitude.replace(",", "."))
        },
        zoom: 16
      };
    });
  };
})();
