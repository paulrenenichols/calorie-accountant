angular.module('mcFridgeMagnets', [])
  .factory('mcFridgeService', [function() {

    var separatePeriodsAndCommasRegex = /[\.\?\!]\s|[\.\?\!]$|,/g;
    var whitespaceRegex = /\s+/g;

    var service = {};

    function splitStringIntoWordsAndPunctuation(str) {
      if (str === "") {
        return [];
      }
      return str.replace(separatePeriodsAndCommasRegex, " $&").split(whitespaceRegex);
    }
    service.splitStringIntoWordsAndPunctuation = splitStringIntoWordsAndPunctuation;

    function createSentenceFromWords(words) {
    }
    service.createSentenceFromWords = createSentenceFromWords;

    return service;
  }])
  .factory('mcMagnetService', [function() {

    var service = {};

    var dragSourceElement = null;

    function dragStartHandler(e) {
      angular.element(this).addClass('moving');

      dragSourceElement = this;

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function dragEnterHandler(e) {
      if (this != dragSourceElement) {
        angular.element(this).addClass('entered');
      }
    }

    function dragOverHandler(e) {
      // According to this article I read, this is necessary to make droping work
      if (e.preventDefault) {
        e.preventDefault(); 
      }

      e.dataTransfer.dropEffect = 'move';

      return false;
    }

    function dragLeaveHandler(e) {
      angular.element(this).removeClass('entered');
    }

    function dragDropHandler(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }

      if (dragSourceElement != this) {
        dragSourceElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      angular.element(this).removeClass('entered');

      return false;
    }

    function dragEndHandler(e) {
      angular.element(this).removeClass('moving');
    }

    function bindDragHandlers(elements) {
      elements.on('dragstart', dragStartHandler);
      elements.on('dragenter', dragEnterHandler);
      elements.on('dragover', dragOverHandler);
      elements.on('dragleave', dragLeaveHandler);
      elements.on('drop', dragDropHandler);
      elements.on('dragend', dragEndHandler);
    }
    service.bindDragHandlers = bindDragHandlers;

    function unbindDragHandlers(elements) {
      elements.off('dragstart', dragStartHandler);
      elements.off('dragenter', dragEnterHandler);
      elements.off('dragover', dragOverHandler);
      elements.off('dragleave', dragLeaveHandler);
      elements.off('drop', dragDropHandler);
      elements.off('dragend', dragEndHandler);
    }
    service.unbindDragHandlers = unbindDragHandlers;

    return service;
  }])
  .directive('mcMagnet', ['mcMagnetService', function (service) {
    var directiveDefinition = {
      scope: false,
      restrict: 'A',
      link: function link(scope, iElement, iAttrs) {
        var magnet = angular.element(iElement).attr('draggable', true).addClass('magnet');
        service.bindDragHandlers(magnet);
        magnet.on('$destroy', function () {
          service.unbindDragHandlers(magnet);
        });
      }

    };
    return directiveDefinition;
  }])
  .directive('mcFridge', ['mcFridgeService', function(service) {
    var directiveDefinition = {
      scope: {
        value: '='
      },
      restrict: 'E',
      template: '<div mc-magnet ng-repeat="word in words track by $index" ng-bind="word"></div>',
      link: function link(scope, iElement, iAttrs) {
        var fridge = angular.element(iElement);
        scope.words = [];
        scope.$watch('value', function () {
          scope.words = service.splitStringIntoWordsAndPunctuation(scope.value);
        });
        fridge.on('dragend', function () {
          console.log(scope.words);
        });
      }

    };
    return directiveDefinition;
  }])
  .controller('mcFridgeMagnetsTestCtrl', [function () {
    this.text = "How are you doing, Tom? I'm doing fine.  Look out!";
  }]);