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
    $scope.activePage = 'arvento';

    $scope.vm = {};
    $scope.callNumber = $rootScope.callNumber;
    $scope.plate = $localStorage.tempServiceList;
    $scope.map = { center: {latitude: 41.100395, longitude: 28.998144}, zoom: 8 };
    $scope.options = {
      mapTypeControl: false,
      draggable: false
    };

    $scope.vm.vehicle = {};

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    $scope.getPhone = function(number) {
      var response = (number + '').replace(/\D/g, '');

      if (response[0] != '0')
       response = '0' + response;

      return response;
    };

    var getLocation = function() {
      $scope.showLoader = true;
      $http.get('http://ws1.tursan.net/GetLocByPlate.ashx?plate=' + $scope.vm.item.Plate)
      .success(function(response) {
        if (response == 'null') return;

        $scope.vm.vehicle.latitude = response.Latitude;
        $scope.vm.vehicle.longtitude = response.Longtitude;
        $scope.vm.vehicle.address = response.Address;

        $scope.vm.marker = {
          id: Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
          coords: {
            latitude: response.Latitude.replace(",", "."),
            longitude: response.Longtitude.replace(",", ".")
          }
        };

        $scope.map = {
          center: {
            latitude: parseFloat(response.Latitude.replace(",", ".")),
            longitude: parseFloat(response.Longtitude.replace(",", "."))
          },
          zoom: 16
        };

        $scope.showLoader = false;
      });
    };

    setInterval(getLocation, 30000);

    $http
      .get('http://ws1.tursan.net/GetServiceDetailsHandler.ashx?plate=' + $localStorage.tempServiceList + "&firmID=" + $localStorage.userName)
      .success(function(response) {
        $scope.vm.item = response;
        if (response.EveningRoute)
          $scope.vm.item.routes = response.EveningRoute.split(' - ');
        $ionicLoading.hide();
        console.log($scope.vm.item)
        getLocation();
      });
  };
})();
