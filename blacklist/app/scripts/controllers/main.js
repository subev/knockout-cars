'use strict';

/**
 * @ngdoc function
 * @name blacklistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blacklistApp
 */
angular.module('blacklistApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
