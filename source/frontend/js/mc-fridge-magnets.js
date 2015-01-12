angular.module('mcFridgeMagnets', [])
  .factory('mcFridgeMagnetsService', [function() {

    var separatePeriodsAndCommasRegex = /\.\s|\.$|,/g;
    var splitOnWhitespaceRegex = /\s/g;

    var service = {};

    function splitString(str) {
      return str.replace(separatePeriodsAndCommasRegex, " $&");
    }
    service.splitString = splitString;

    return service;
  }]);