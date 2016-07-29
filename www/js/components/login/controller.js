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
    '$ionicLoading'
  ];


  /**
   * Controller.
   */
  function LoginController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading) {
    $scope.vm = {};

    $scope.studentLogin = function() {
      $state.go('student-login');
    };

    $scope.login = function() {
      $ionicLoading.show({
        template: 'Yukleniyor...'
      });

      ApiFactory
        .login({
          userName: $scope.vm.username,
          password: $scope.vm.password
        })
        .then(function(res) {
          $ionicLoading.hide();

          var exists = res.split(' ')[0][0];

          if (exists == '0')
            return alert('Login error');

          $localStorage.userName = $scope.vm.username;
          $localStorage.password = $scope.vm.password;

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('tab.menu');
        })
        .catch(function(err) {
          console.error('err', err);
          $ionicLoading.hide();
        })
    };
  };
})();
