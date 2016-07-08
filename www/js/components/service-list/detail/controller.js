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
    '$ionicHistory'
  ];


  /**
   * Controller.
   */
  function ServiceListDetailController($scope, ApiFactory, $localStorage, $state, $ionicHistory) {
    $scope.vm = {};
    $scope.vm.item = $localStorage.tempServiceList;
    $scope.vm.locations = $scope.vm.item[5].split(',');

    $scope.vm.locations = $scope.vm.locations.filter(function(item, pos) {
      return $scope.vm.locations.indexOf(item) == pos;
    });
  };
})();
