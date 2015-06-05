var lpModule = angular.module('playgroundModule', [])
  .controller('SomeController', ['$scope', function ($scope) {
    $scope.visible = true;
    $scope.appId = 123;
    $scope.customer = {
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
