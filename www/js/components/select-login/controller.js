(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('SelectLoginController', SelectLoginController);


  /**
   * Dependencies.
   */
  SelectLoginController.$inject = [
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
  function SelectLoginController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading) {
    $scope.vm = {};

    $scope.studentLogin = function() {
      $state.go('student-login');
    };

    $scope.personelLogin = function() {
      $state.go('login');
    };
  };
})();
