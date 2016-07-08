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
    '$ionicPopup'
  ];


  /**
   * Controller.
   */
  function SuggestController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $ionicPopup) {
    $scope.vm = {};

    $scope.send = function() {
      if (!$scope.vm.email || !$scope.vm.name || !$scope.vm.message)
        return $ionicPopup.alert({
           title: 'Bilgi',
           template: 'Lutfen butun bilgileri eksiksiz girin.'
         });

      $ionicLoading.show({
        template: 'Yukleniyor...'
      });

      ApiFactory
        .setSuggest({
          userName: $localStorage.userName,
          userPassword: $localStorage.password,
          firmID: $localStorage.userName,
          EMail: $scope.vm.email + '_#_' + $scope.vm.name,
          MyMessage: $scope.vm.message
        })
        .then(function() {
          $ionicLoading.hide();
          $scope.vm = {};
          $ionicPopup.alert({
             title: 'Bilgi',
             template: 'Mesajiniz basariyla gonderildi.'
           });
        })
        .catch(function(err) {
          console.error('err', err);
          $ionicLoading.hide();
        })
    };
  };
})();
