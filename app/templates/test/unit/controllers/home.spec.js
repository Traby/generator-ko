describe('home controller', function () {

    'use strict';

    var scope, controller, cfg;

    beforeEach(function () {
        module('app');
    });

    beforeEach(inject(function ($injector) {
        cfg = $injector.get('configuration');
        spyOn(cfg, 'getAppName').andCallThrough();
    }));

    beforeEach(function () {
        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('HomeCtrl', {
                $scope: scope,
                configuration: cfg
            });
        });
    });

    it('should be defined', function () {
        expect(scope.title).toBeDefined();
        expect(scope.title).toBe('My App');
        expect(cfg.getAppName).toHaveBeenCalled();
    });

});
