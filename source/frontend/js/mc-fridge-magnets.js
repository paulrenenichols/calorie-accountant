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
  }])
  .directive('mcFridgeMagnets', ['mcFridgeMagnetsService', function(service) {
    var directiveDefinition = {
      scope: {
        value: '='
      },
      restrict: 'E',
      template: '<div ng-repeat="word in words track by $index" ng-bind="word"></div>',
      link: function link(scope, iElement, iAttrs) {
        scope.words = [];
        scope.$watch('value', function () {
          scope.words = service.splitStringIntoWordsAndPunctuation(scope.value);
        });
      }

    };
    return directiveDefinition;
  }])
  .controller('mcFridgeMagnetsTestCtrl', [function () {
    this.text = "How are you doing, Tom? I'm doing fine.  Look out!";
  }]);