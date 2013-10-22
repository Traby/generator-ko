/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// ======================================================================
// Home Controller
// ======================================================================

angular.module('controllers').controller('HomeCtrl', ['$scope', 'configuration', function ($scope, cfg) {

  'use strict';

  $scope.title = cfg.getAppName();

}]);
