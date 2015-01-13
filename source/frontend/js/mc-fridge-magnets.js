angular.module('mcFridgeMagnets', [])
  .factory('mcFridgeMagnetsService', [function() {

    var separatePeriodsAndCommasRegex = /[\.\?\!]\s|[\.\?\!]$|,/g;
    var whitespaceRegex = /\s+/g;

    var service = {};

    function splitStringIntoWordsAndPunctuation(str) {
      return str.replace(separatePeriodsAndCommasRegex, " $&").split(whitespaceRegex);
    }
    service.splitStringIntoWordsAndPunctuation = splitStringIntoWordsAndPunctuation;

    return service;
  }]);