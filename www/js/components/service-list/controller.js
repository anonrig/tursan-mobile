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
    '$ionicLoading'
  ];


  /**
   * Controller.
   */
  function ServiceListController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading) {
    $scope.vm = {};
    $scope.vm.items = [];

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    ApiFactory
      .getServiceList({
        userName: $localStorage.userName,
        userPassword: $localStorage.password,
        firmID: $localStorage.userName,
        ArventoCode: 'tursanpersonelweb',
        ArventoPass1: 'asasasas',
        ArventoPass2: 'asasasas'
      })
      .then(function(res) {
        res = res.split('_##_');

        res.forEach(function(item) {
          $scope.vm.items.push({
            plaka: item.split('_#_')[3],
            number: item.split('_#_')[1],
            item: item.split('_#_')
          });
        });

        $scope.vm.items = _.sortBy($scope.vm.items, ['plaka']);

        $ionicLoading.hide();
      })
      .catch(function(err) {
        console.error('Err', err);
        $ionicLoading.hide();
      });

    $scope.go = function(item) {
      $localStorage.tempServiceList = item.item;

      $state.go('tab.service-list-detail')
    };
  };
})();
