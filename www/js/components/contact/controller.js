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
    '$rootScope',
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory'
  ];


  /**
   * Controller.
   */
  function ContactController($rootScope, $scope, ApiFactory, $localStorage, $state, $ionicHistory) {
    $scope.vm = {};

    $scope.callNumber = $rootScope.callNumber;
    $scope.options = {
      mapTypeControl: false,
      draggable: false
    };

    $scope.openMaps = function() {
      if (ionic.Platform.isIOS())
        window.open('maps://?q=40.986294,29.091977');
      else {
        window.open('geo:40.986294,29.091977')
      }
    };

    $scope.shareMail = function(mail) {
      cordova.plugins.email.open({
        to: mail
    }, null, null);
    };

    $scope.vm.marker = {
      id: Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
      coords: {
        latitude: 40.986294,
        longitude: 29.091977
      }
    };

    $scope.map = {
      center: {
        latitude: 40.986294,
        longitude: 29.091977
      },
      zoom: 16
    };


  };
})();
