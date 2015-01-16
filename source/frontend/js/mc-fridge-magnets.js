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
  .directive('mcMagnet', [function () {

    function dragStartHandler(e) {
      console.log('dragStartHandler', angular.element(this).text(), e);
    }

    function dragEnterHandler(e) {
      console.log('dragEnterHandler', angular.element(this).text(), e);
    }

    function dragOverHandler(e) {
      // console.log('dragOverHandler', angular.element(this).text(), e);
    }

    function dragLeaveHandler(e) {
      console.log('dragLeaveHandler', angular.element(this).text(), e);
    }

    function dragDropHandler(e) {
      console.log('dragDropHandler', angular.element(this).text(), e);
    }

    function dragEndHandler(e) {
      console.log('dragEndHandler', angular.element(this).text(), e);
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
      scope: false,
      restrict: 'A',
      link: function link(scope, iElement, iAttrs) {
        var magnet = angular.element(iElement).attr('draggable', true);
        bindDragHandlers(magnet);
        magnet.on('$destroy', function () {
          unbindDragHandlers(magnet);
        });
      }

    };
    return directiveDefinition;
  }])
  .directive('mcFridge', ['mcFridgeMagnetsService', function(service) {

    var directiveDefinition = {
      scope: {
        value: '='
      },
      restrict: 'E',
      template: '<div class="magnet" mc-magnet ng-repeat="word in words track by $index" ng-bind="word"></div>',
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