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
    '$rootScope',
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory',
    '$http',
    '$ionicLoading'
  ];


  /**
   * Controller.
   */
  function ServiceListDetailController($rootScope, $scope, ApiFactory, $localStorage, $state, $ionicHistory, $http, $ionicLoading) {
    $scope.vm = {};
    $scope.callNumber = $rootScope.callNumber;
    $scope.plate = $localStorage.tempServiceList;
    $scope.map = { center: {latitude: 41.100395, longitude: 28.998144}, zoom: 8 };
    $scope.options = {
      mapTypeControl: false,
      draggable: false
    };

    $scope.vm.vehicle = {
      address: 'Yükleniyor...'
    };

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    $http
      .get('http://ws1.tursan.net/GetServiceDetailsHandler.ashx?plate=' + $localStorage.tempServiceList + "&firmID=" + $localStorage.userName)
      .success(function(response) {
        $scope.vm.item = response;
        console.log(response)
        $ionicLoading.hide();
        $http.post('http://ws1.tursan.net/GetCurrentLoc.aspx/GetCurrentLocByParam', {
          param: $scope.vm.item.Plate
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
      });
  };
})();
