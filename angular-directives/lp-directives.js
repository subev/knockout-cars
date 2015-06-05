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

        //something like an initializer function
    return {
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
