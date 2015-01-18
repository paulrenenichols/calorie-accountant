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

    var dragSrcEl = null;

    function dragStartHandler(e) {
      this.style.opacity = '0.4';

      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
      console.log('dragStartHandler', angular.element(this).text(), e);
    }

    function dragEnterHandler(e) {
      this.style.border = '2px dashed #000';
      console.log('dragEnterHandler', angular.element(this).text(), e);
    }

    function dragOverHandler(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
      // console.log('dragOverHandler', angular.element(this).text(), e);
    }

    function dragLeaveHandler(e) {
      this.style.border = 'none';
      console.log('dragLeaveHandler', angular.element(this).text(), e);
    }

    function dragDropHandler(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }

      // Don't do anything if dropping the same column we're dragging.
      if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      this.style.border = 'none';

      console.log('dragDropHandler', angular.element(this).text(), e);
      return false;
      
    }

    function dragEndHandler(e) {
      this.style.opacity = '1';
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
        var magnet = angular.element(iElement).attr('draggable', true).addClass('magnet');
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
      template: '<div mc-magnet ng-repeat="word in words track by $index" ng-bind="word"></div>',
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