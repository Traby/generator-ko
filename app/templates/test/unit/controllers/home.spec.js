describe('home controller', function () {

    'use strict';

    var scope, controller;

    var cfgMock = {
        getAppName: function () {
            return 'blah blah';
        }
    };

    beforeEach(function () {

        module('app');

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('HomeCtrl', {
                $scope: scope,
                configuration: cfgMock
            });
        });

    });

    it('should be defined', function () {
        expect(scope.title).toBeDefined();
        expect(scope.title).toBe('blah blah');
    });

});
