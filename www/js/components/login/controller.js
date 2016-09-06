(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('LoginController', LoginController);


  /**
   * Dependencies.
   */
  LoginController.$inject = [
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
  function LoginController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};

    $scope.studentLogin = function() {
      $state.go('student-login');
    };

    $scope.login = function() {
      $ionicLoading.show({
        template: 'Yukleniyor...'
      });

      $http
        .get('http://ws1.tursan.net/UserLogin.ashx?firmID=' + $scope.vm.username + '&password=' + $scope.vm.password)
        .success(function(response) {
          if (response == 'null') {
            $ionicLoading.hide();
            return navigator.notification.alert('Hatalı Şifre veya Kurum Kodu girdiniz.', null, 'Bilgi', 'Tamam')
          }

          $ionicLoading.hide();

          $localStorage.userName = $scope.vm.username;
          $localStorage.password = $scope.vm.password;

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('tab.menu');
        });
    };
  };
})();
