/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// ======================================================================
// Configuration Service
// ======================================================================

angular.module('services').factory('configuration', [function () {

  'use strict';

  function getAppName() {
    return 'My App';
  }

  return {
    getAppName: getAppName
  };

}]);
