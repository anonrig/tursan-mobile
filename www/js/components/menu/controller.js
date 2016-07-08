(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('MenuController', MenuController);


  /**
   * Dependencies.
   */
  MenuController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state'
  ];


  /**
   * Controller.
   */
  function MenuController($scope, ApiFactory, $localStorage, $state) {
    $scope.vm = {};

    $scope.go = function(input) {
      $state.go(input)
    }
  };
})();
