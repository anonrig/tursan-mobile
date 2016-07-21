(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('SuggestController', SuggestController);


  /**
   * Dependencies.
   */
  SuggestController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicPopup',
    '$http'
  ];


  /**
   * Controller.
   */
  function SuggestController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $ionicPopup, $http) {
    $scope.vm = {};

    $scope.send = function() {
      console.log($scope.vm)
      if (!$scope.vm.email || !$scope.vm.name || !$scope.vm.message)
        return $ionicPopup.alert({
           title: 'Bilgi',
           template: 'Lutfen butun bilgileri eksiksiz girin.'
         });

      $ionicLoading.show({
        template: 'Yukleniyor...'
      });

      $http
        .post('http://ws1.tursan.net//DilekSikayetHandler.ashx?user=' + $scope.vm.name + "&message=" + $scope.vm.message + "&info=" + $scope.vm.email)
        .success(function() {
          $ionicLoading.hide();
          $scope.vm = {};
          $ionicPopup.alert({
             title: 'Bilgi',
             template: 'Mesajiniz basariyla gonderildi.'
           });
        });
    };
  };
})();
