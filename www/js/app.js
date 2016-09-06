(function() {
  /**
   * Empty templates module. This module is used when compiling html
   * views into angular's template cache.
   */
  angular.module('templates', []);

  /**
   * Initialize Tursan.
   */
  window.Tursan = angular.module('Tursan', [
    'ionic',
    'templates',
    'ngResource',
    'ngStorage',
    'angularMoment',
    'angularSoap',
    'uiGmapgoogle-maps',
    'jett.ionic.filter.bar'
  ]);

  Tursan
    .run(['$ionicPlatform', '$rootScope', '$localStorage', 'amMoment', '$rootScope',
      function($ionicPlatform, $rootScope, $localStorage, amMoment, $rootScope) {
        $ionicPlatform.ready(function() {
          if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }

          if(window.StatusBar) {
            StatusBar.styleLightContent();
          }

          moment.locale('tr');

          $rootScope.callNumber = function(number) {
            // window.location.href = 'tel:' + number;
            window.plugins.CallNumber.callNumber(null, null, number, false);
          };

          amMoment.changeLocale('tr');
        });
      }
    ]);

  Tursan
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('tab', {
            abstract: true,
            templateUrl: './js/components/tabs/view.html'
          })
          .state('tab.menu', {
            url: '/menu',
            cache: false,
            views: {
              'tab-menu': {
                templateUrl: './js/components/menu/view.html',
                controller: 'MenuController'
              }
            }
          })
          .state('tab.location-list', {
            url: '/location-list',
            views: {
              'tab-menu': {
                templateUrl: './js/components/location-list/view.html',
                controller: 'LocationListController'
              }
            }
          })
          .state('tab.location-list-detail', {
            url: '/location-list/detail',
            views: {
              'tab-menu': {
                templateUrl: './js/components/location-list/detail/view.html',
                controller: 'LocationListDetailController'
              }
            }
          })
          .state('tab.is-arrived', {
            url: '/is-arrived',
            views: {
              'tab-menu': {
                templateUrl: './js/components/is-arrived/view.html',
                controller: 'IsArrivedController'
              }
            }
          })
          .state('tab.service-list', {
            url: '/service-list',
            views: {
              'tab-menu': {
                templateUrl: './js/components/service-list/view.html',
                controller: 'ServiceListController'
              }
            }
          })
          .state('tab.service-list-detail', {
            url: '/service-list/detail',
            views: {
              'tab-menu': {
                templateUrl: './js/components/service-list/detail/view.html',
                controller: 'ServiceListDetailController'
              }
            }
          })
          .state('tab.about', {
            url: '/about',
            views: {
              'tab-about': {
                templateUrl: './js/components/about/view.html',
                controller: 'AboutController'
              }
            }
          })
          .state('tab.contact', {
            url: '/contact',
            views: {
              'tab-contact': {
                templateUrl: './js/components/contact/view.html',
                controller: 'ContactController'
              }
            }
          })
          .state('tab.suggest', {
            url: '/suggest',
            views: {
              'tab-menu': {
                templateUrl: './js/components/suggest/view.html',
                controller: 'SuggestController'
              }
            }
          })
          .state('tab.poll', {
            url: '/poll',
            views: {
              'tab-menu': {
                templateUrl: './js/components/poll/view.html',
                controller: 'PollController'
              }
            }
          })
          .state('tab.poll-detail', {
            url: '/poll-detail/:id',
            cache: false,
            views: {
              'tab-menu': {
                templateUrl: './js/components/poll/detail/view.html',
                controller: 'PollDetailController'
              }
            }
          })
          .state('select-login', {
            url: '/select-login',
            templateUrl: './js/components/select-login/view.html',
            controller: 'SelectLoginController'
          })
          .state('login', {
            url: '/login',
            templateUrl: './js/components/login/view.html',
            controller: 'LoginController'
          })
          .state('student-login', {
            url: '/student-login',
            templateUrl: './js/components/student-login/view.html',
            controller: 'StudentLoginController'
          });

        if (localStorage.getItem('ngStorage-userName') || localStorage.getItem('ngStorage-tckimlik'))
          $urlRouterProvider.otherwise('/menu');
        else
          $urlRouterProvider.otherwise('/select-login');
      }
    ]);
})();
