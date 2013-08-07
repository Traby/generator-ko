/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// ======================================================================
// Home Controller
// ======================================================================

function HomeCtrl($scope, cfg) {

    'use strict';

    $scope.message = cfg.getAppName();

}
HomeCtrl.$inject = ['$scope', 'configuration'];
