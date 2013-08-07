/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// ======================================================================
// Configuration Service
// ======================================================================

angular.module('koapp.services').factory('configuration', [function () {

    'use strict';

    function getAppName() {
        return 'KO APP';
    }

    return {
        getAppName: getAppName
    };

}]);
