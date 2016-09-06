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
    '$rootScope',
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
  function MenuController($rootScope, $scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $http) {
    $scope.vm = {};
    $scope.callNumber = $rootScope.callNumber;
    $scope.isStudent = !!$localStorage.tckimlik;

    $scope.studentInfo = $localStorage.studentInfo;
    $scope.options = {
      mapTypeControl: false,
      draggable: false
    };

    $scope.getPhone = function(number) {
      var response = (number + '').replace(/\D/g, '');

      if (response[0] != '0')
       response = '0' + response;

      return response;
    };

    if ($scope.isStudent) {
      $scope.vm.marker = {
        id: Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
        coords: {
          latitude: $localStorage.studentInfo.Latitude.replace(",", "."),
          longitude: $localStorage.studentInfo.Longtitude.replace(",", ".")
        }
      };

      $scope.map = {
        center: {
          latitude: $localStorage.studentInfo.Latitude.replace(",", "."),
          longitude: $localStorage.studentInfo.Longtitude.replace(",", ".")
        },
        zoom: 16
      };
    }

    $scope.go = function(input) {
      $state.go(input)
    };

    $scope.refresh = function() {
      $ionicLoading.show({
        template: 'Yukleniyor...'
      });

      $http
        .post("http://ws1.tursan.net/GetStudentServiceH.ashx?TC=" + $localStorage.tckimlik)
        .success(function(response) {
          $ionicLoading.hide();

          $localStorage.studentInfo = response;
          $scope.studentInfo = response;
          $scope.vm.marker = {
            id: Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
            coords: {
              latitude: $localStorage.studentInfo.Latitude.replace(",", "."),
              longitude: $localStorage.studentInfo.Longtitude.replace(",", ".")
            }
          };

          $scope.map = {
            center: {
              latitude: $localStorage.studentInfo.Latitude.replace(",", "."),
              longitude: $localStorage.studentInfo.Longtitude.replace(",", ".")
            },
            zoom: 16
          };
        });
    };

    $scope.onlinePayment = function() {
      var url = 'https://tursan.net/online-odeme';

      if (typeof(SafariViewController) == 'undefined')
        return window.open(url, '_blank', 'location=yes');

      SafariViewController.isAvailable(function (available) {
        if (available) {
          SafariViewController.show({
            url: url,
            hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
            animated: false, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
            transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
            enterReaderModeIfAvailable: false, // default false
            tintColor: "#ff0000" // default is ios blue
          },
          function(result) {
          },
          function(msg) {
            // alert("KO: " + msg);
          })
        } else {
          // potentially powered by InAppBrowser because that (currently) clobbers window.open
          window.open(url, '_blank', 'location=yes');
        }
      });
    };

    $scope.logout = function() {
      $localStorage.$reset();

      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('select-login');
    };
  };
})();
