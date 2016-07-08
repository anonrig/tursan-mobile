(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('AboutController', AboutController);


  /**
   * Dependencies.
   */
  AboutController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory'
  ];


  /**
   * Controller.
   */
  function AboutController($scope, ApiFactory, $localStorage, $state, $ionicHistory) {
    $scope.vm = {};

  };
})();
