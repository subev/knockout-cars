'use strict';

/**
 * @ngdoc function
 * @name blacklistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blacklistApp
 */
angular.module('blacklistApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
