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
      template: 'Yukleniyor...'
    });

    $http.post('http://ws1.tursan.net/HasDeviceControl.aspx/HasDevice', {
      param: $localStorage.userName
    }).success(function(response) {
      $scope.vm.items = _.sortBy(JSON.parse(response.d), ['HasDevice']);

      $ionicLoading.hide();
    });
  };
})();
