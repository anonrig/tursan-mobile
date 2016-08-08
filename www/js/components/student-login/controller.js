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

      console.log($scope.vm.tckimlik);

      $http
        .post("http://ws1.tursan.net/GetStudentServiceH.ashx?TC=" + $scope.vm.tckimlik)
        .success(function(response) {
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
