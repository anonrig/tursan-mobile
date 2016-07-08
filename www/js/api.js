(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.service('ApiFactory', ApiFactory);


  /**
   * Dependencies.
   */
  ApiFactory.$inject = [
    '$soap'
  ];


  /**
   * Controller.
   */
  function ApiFactory($soap) {
    var apiUrl = 'http://213.74.26.178:3333/MobileService.asmx';

    this.login = function(params) {
      return $soap.post(apiUrl, 'GetUserLogin', params);
    };

    this.getServiceList = function(params) {
      return $soap.post(apiUrl, 'GetVehicleList', params);
    };

    this.getLocationList = function(params) {
      return $soap.post(apiUrl, 'GetRoutes', params);
    };

    this.getRouteDetails = function(params) {
      return $soap.post(apiUrl, 'GetRouteDetails', params);
    };

    this.setSuggest = function(params) {
      return $soap.post(apiUrl, 'SetOffer', params);
    };
  };
})();
