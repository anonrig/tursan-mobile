(function() {
    /**
     * Environment configuration
     */
    Tursan
        .constant('config', {
          'apiUrl': 'https://canli-kahve-fali-test.herokuapp.com',
          'version': '1.0.0'
        });

    Tursan
        .config(['$ionicConfigProvider', function($ionicConfigProvider) {
        }]);
})();
