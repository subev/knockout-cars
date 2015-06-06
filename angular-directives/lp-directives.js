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
