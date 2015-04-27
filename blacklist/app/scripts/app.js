'use strict';

/**
 * @ngdoc overview
 * @name blacklistApp
 * @description
 * # blacklistApp
 *
 * Main module of the application.
 */
angular
  .module('blacklistApp', [
    'ngRoute',
    'kendo.directives'
    ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/complaints', {
        templateUrl: 'views/all-complaints.html',
        controller: 'ComplaintsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/kendo-grid.html',
        controller: 'kendo-grid'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
