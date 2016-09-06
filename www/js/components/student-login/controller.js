(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('StudentLoginController', StudentLoginController);


  /**
   * Dependencies.
   */
  StudentLoginController.$inject = [
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
  function StudentLoginController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};

    $scope.login = function() {
      $ionicLoading.show({
        template: 'Yukleniyor...'
      });

      $http
        .post("http://ws1.tursan.net/GetStudentServiceH.ashx?TC=" + $scope.vm.tckimlik)
        .success(function(response) {
          if (response == 'null') {
            $ionicLoading.hide();
            
            return navigator.notification.alert('Girdiğiniz TC numarası sistemimizde bulunmamaktadır.', null, 'Bilgi', 'Tamam')
          }
          $ionicLoading.hide();

          $localStorage.tckimlik = $scope.vm.tckimlik;
          $localStorage.studentInfo = response;
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('tab.menu');
        })
        .error(function() {
          alert('Girdiğiniz TC numarası sistemimizde bulunmamaktadır.');
        });
    };
  };
})();
