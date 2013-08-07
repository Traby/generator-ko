describe('app', function () {

    'use strict';

    var module, dependencies;

    beforeEach(function () {
        module = angular.module('app');
        dependencies = module.requires;
    });

    it('should be defined', function () {
        expect(module).not.toBeUndefined();
    });

    describe('check defined dependencies:', function () {

        var hasModule = function (module) {
            return dependencies.indexOf(module) >= 0;
        };

        it('check services module is dependency of app', function () {
            expect(hasModule('services')).toBe(true);
            expect(hasModule('controllers')).toBe(true);
        });

    });

});
