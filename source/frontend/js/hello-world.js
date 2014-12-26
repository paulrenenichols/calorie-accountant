angular.module('helloWorldApp', [])
  .directive('helloWorld', [ '$window', '$document', function ($window, $document) {
    console.log("Creating helloWorld directive");

    var helloWorldDefinitionObject = {
      scope: {
        value: '@',
        width: '@',
        height: '@'
      },
      restrict: 'E',
      template: '<div><p>{{value}}</p><textarea ng-model="value"></textarea></div>',
      link: function link(scope, iElement, iAttrs) {

        console.log("What's up?");
        
        var editModeIsActive = false;

        var container = angular.element(iElement);
        var div = container.find('div');
        var paragraph = container.find('p');
        var textarea = container.find('textarea');

        div.css('width', scope.width);
        div.css('height', scope.height);
        div.children().css('width', "100%").css('height', '100%').css('font-size', '20px');

        paragraph.css('display', 'block');
        textarea.css('display', 'none');

        function toggleEditHander() {
          editModeIsActive = !editModeIsActive;
          if (editModeIsActive) {
            paragraph.css('display', 'none');
            textarea.css('display', 'block');
            textarea[0].focus();
          }
          else {
            paragraph.css('display', 'block');
            textarea.css('display', 'none'); 
            paragraph[0].focus();
          }
        }

        function enterPressedHander (e) {
          if (e.keyCode == 13) {
            toggleEditHander();
          }
        }

        container.on('click', toggleEditHander);
        $document.on('keyup', enterPressedHander);

        scope.$watch('width', function () {
          div.css('width', scope.width);
          div.children().css('width', "100%");
        });

        scope.$watch('height', function () {
          div.css('height', scope.height);
          div.children().css('height', '100%');
        });
      }
    };
    return helloWorldDefinitionObject;
  }]);