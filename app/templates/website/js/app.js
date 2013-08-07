/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// --------------------------------------------------------------------------
// A P P
// --------------------------------------------------------------------------

angular.module('koapp.services', []);
var app = angular.module('koapp', ['koapp.services']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    'use strict';

    $locationProvider.hashPrefix('!');

    // load routes
    $routeProvider.when('/home', {templateUrl: 'views/home.html'});

    // set fallback path to first view
    $routeProvider.otherwise({redirectTo: '/home'});

}]);
