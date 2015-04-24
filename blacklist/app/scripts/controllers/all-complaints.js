'use strict';

angular.module('blacklistApp')
  .controller('ComplaintsCtrl', ['$scope', 'complaintSvc', function ($scope, complaintSvc) {
        complaintSvc.getComplaints(function(result) {
            $scope.complaints = result;
            $scope.$apply();
        });
  }]);
