/*
 *  Copyright 2013 Karl Ostendorf <karl@ostendorf.com>
 */

// ======================================================================
// Home Controller
// ======================================================================

define(['app'], function (app) {

    'use strict';

    return app.controller('HomeCtrl', ['$scope',

        function HomeCtrl($scope) {

            $scope.message = 'let\'s get busy';

        }

    ]);

});

