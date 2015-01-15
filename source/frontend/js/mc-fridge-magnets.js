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

    function dragStartHandler() {
      console.log('dragStartHandler');
    }

    function dragEnterHandler() {
      console.log('dragEnterHandler');
    }

    function dragOverHandler(e) {
      console.log('dragOverHandler', angular.element(this).text(), e);
    }

    function dragLeaveHandler() {
      console.log('dragLeaveHandler');
    }

    function dragDropHandler() {
      console.log('dragDropHandler');
    }

    function dragEndHandler() {
      console.log('dragEndHandler');
    }

    function bindDragHandlers(elements) {
      elements.on('dragstart', dragStartHandler);
      elements.on('dragenter', dragEnterHandler);
      elements.on('dragover', dragOverHandler);
      elements.on('dragleave', dragLeaveHandler);
      elements.on('drop', dragDropHandler);
      elements.on('dragend', dragEndHandler);
    }

    function unbindDragHandlers(elements) {
      elements.off('dragstart', dragStartHandler);
      elements.off('dragenter', dragEnterHandler);
      elements.off('dragover', dragOverHandler);
      elements.off('dragleave', dragLeaveHandler);
      elements.off('drop', dragDropHandler);
      elements.off('dragend', dragEndHandler);
    }

    var directiveDefinition = {
      scope: {
        value: '='
      },
      restrict: 'E',
      template: '<div class="magnet" draggable="true" ng-repeat="word in words track by $index" ng-bind="word"></div>',
      link: function link(scope, iElement, iAttrs) {
        var container = angular.element(iElement);
        scope.words = [];
        scope.$watch('value', function () {
          unbindDragHandlers(container);
          scope.words = service.splitStringIntoWordsAndPunctuation(scope.value);
          bindDragHandlers(container);
        });
      }

    };
    return directiveDefinition;
  }])
  .controller('mcFridgeMagnetsTestCtrl', [function () {
    this.text = "How are you doing, Tom? I'm doing fine.  Look out!";
  }]);