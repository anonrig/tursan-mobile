(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('PollController', PollController);


  /**
   * Dependencies.
   */
  PollController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicPopup',
    '$http'
  ];


  /**
   * Controller.
   */
  function PollController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $ionicPopup, $http) {
    $scope.vm = {};

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    $http
      .post('http://ws1.tursan.net/GetAllSurveys.ashx?firmID=' + $localStorage.userName)
      .success(function(response) {
        $scope.vm.items = response;

        $ionicLoading.hide();
      });


    $scope.getDate = function(date) {
      console.log(new Date(date));
      var currentDate = new Date(date);

      return moment(currentDate).fromNow()
    }
    $scope.go = function(item) {
      $state.go('tab.poll-detail', {
        id: item.ID
      });
    };
  };
})();
