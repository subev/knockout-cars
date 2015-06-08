lpModule
  .directive('lpForm', function () {
    return {
      scope: {
        'visible': "=",
        'customerInfo': "=info"
      },
      templateUrl: 'form-template.html'
    }
  })
  //this directive doesn't have template since it does not need it
  .directive('lpTimer', ['$interval', 'dateFilter', function ($interval, dateFilter) {

    return {
        //something like an initializer function
        link: function($scope, element, attrs) {
          var format = $scope.format || element.attr('format');
          var timeoutId;

          element.css('border', '1px solid blue');

          function updateTime (argument) {
            //element.text(dateFilter(new Date(), format));
            element.text(dateFilter(new Date(), format));
          }

          $scope.$watch(attrs.myCurrentTime, function(value) {
            updateTime();
          });

          element.on('$destroy', function() {
            $interval.cancel(timeoutId);
          });

          timeoutId = $interval(function() {
            updateTime();
          }, 1000);
        }
    }
  }])
  .directive('lpDialog', function() {
    return {
      //could be added just on elements
      restrict: 'E',
      templateUrl: 'dialog-template.html',
      transclude: true,
      scope: {
        'close': '&onClose',
        'state': '=state'
      },
      link: function($scope) {
        //this will hide the parent scope variable
        //$scope.appId = 13;
        $scope.foo = "this is coming from link"
      }
    }
  })
  .directive('lpDraggable', ['$document', function(doc) {
    return {
      link: function(scope, element, attr) {
        var startX = 0,
            startY = 0,
            x = 0,
            y = 0;

        element.css({
          position: 'relative',
          border: '1px solid red',
          backgorundColor: 'lightgrey',
        });

        element.addClass('pointer');

        element.on('mousedown', function(e) {
          e.preventDefault();
          startX = e.pageX - x;
          startY = e.pageY - y;
          doc.on('mousemove', mouseMove);
          doc.on('mouseup', mouseUp);
        });

        function mouseMove (e) {
          x = e.pageX - startX;
          y = e.pageY - startY;
          element.css({
            top: y + 'px',
            left: x + 'px'
          });
        }

        function mouseUp (argument) {
          doc.off('mousemove', mouseMove);
          doc.off('mouseup', mouseUp);
        }
      }
    }
  }])
  //the next two directives go together
  .directive('lpTabstrip', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: ['$scope', function($scope) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }

        this.addPane = function(pane) {
          if (panes.length === 0) {
            $scope.select(pane);
          }
          panes.push(pane);
        }
      }],
      templateUrl: "tabstrip-template.html",
    }
  })
  .directive('lpTab', function() {
    return {
      resitrct: "E",
      require: '^lpTabstrip',
      transclude: true,
      scope: {
        title: '@'
      },
      link: function(scope, element, attr, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      templateUrl: 'tab-template.html'
    }
  })
  ;
