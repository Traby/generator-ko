/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// --------------------------------------------------------------------------
// A P P
// --------------------------------------------------------------------------

var app = angular.module('koapp', []);

app.config(function ($routeProvider, $locationProvider) {
    'use strict';
    $locationProvider.hashPrefix('!');
    app.routeProvider = $routeProvider;
});

app.run(['$rootScope', '$location', function ($rootScope, $location) {

    'use strict';

    // load routes
    app.routeProvider.when('/home', {templateUrl: 'views/home.html'});

    // set fallback path to first view
    app.routeProvider.otherwise({redirectTo: '/home'});

    delete app.routeProvider;

}]);
