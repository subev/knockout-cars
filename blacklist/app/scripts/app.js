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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
