(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('ContactController', ContactController);


  /**
   * Dependencies.
   */
  ContactController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory'
  ];


  /**
   * Controller.
   */
  function ContactController($scope, ApiFactory, $localStorage, $state, $ionicHistory) {
    $scope.vm = {};

  };
})();
