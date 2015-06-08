var lpModule = angular.module('playgroundModule', [])
  .controller('FirstController', ['$scope', function ($scope) {
    $scope.visible = true;
    $scope.appId = 123;
    $scope['customer'] = {
      name: 'Petur',
      address: 'Bulgaria'
    };

    $scope.customer2 = {
      name: 'John',
      address: 'USA',
      //this does not seem to work because prefix is missing in template
      visible: true
    };
    $scope.customers = [$scope.customer, $scope.customer2];
  }])
  .controller('SecondController', ['$scope', '$timeout', function (scope, to) {
    scope.appId = 234;
    scope.state = true;
    scope.contrClose = function(message) {
      scope.state  = false;
      scope.message = message;

      to(function() {
        scope.message = undefined;
        scope.state  = true;
      }, 1000);
    };

  }])
  .controller('ThirdController', ['$scope', function($scope) {
    $scope.i = 3;
  }])
