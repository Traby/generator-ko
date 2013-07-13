/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// --------------------------------------------------------------------------
// RequireJS configuration
// --------------------------------------------------------------------------
require.config({
	paths: {
		angular: '../components/angular/angular'
	},
	shim: {
		'angular': {'exports' : 'angular'}
	},
	priority: [
		'angular'
	]
});

// --------------------------------------------------------------------------
// application starting point
// --------------------------------------------------------------------------
require([

    'angular',
    'app',
    'home'

], function (angular) {

    'use strict';

    angular.bootstrap(document, ['app']);

});
