/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// --------------------------------------------------------------------------
// A P P
// --------------------------------------------------------------------------

define(['angular'], function (angular) {

    'use strict';

    var app = angular.module('app', []);

    app.config(function ($routeProvider, $locationProvider) {

        $locationProvider.hashPrefix('!');

        // load routes
        $routeProvider.when('/home', {templateUrl: 'views/home.html'});

        // set fallback path to first view
        $routeProvider.otherwise({redirectTo: '/home'});

    });

    return app;

});
