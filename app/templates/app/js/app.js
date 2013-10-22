/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// --------------------------------------------------------------------------
// A P P
// --------------------------------------------------------------------------

angular.module('services', []);
angular.module('controllers', []);
var app = angular.module('app', ['ngRoute', 'services', 'controllers']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  'use strict';

  $locationProvider.hashPrefix('!');

  // load routes
  $routeProvider.when('/home', {templateUrl: 'views/home.html'});

  // set fallback path to first view
  $routeProvider.otherwise({redirectTo: '/home'});

}]);
