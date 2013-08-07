describe('koApp Application Unit Test', function () {

    'use strict';

    var module, dependencies;

    beforeEach(function () {
        module = angular.module('koapp');
        dependencies = module.requires;
    });

    it('should be registered as application module', function () {
        expect(module).not.toBeUndefined();
    });

    describe('Check defined dependencies:', function () {

        var hasModule = function (module) {
            return dependencies.indexOf(module) >= 0;
        };

        //it('should have controllers has dependency', function() {
        //   expect(hasModule('controllers')).toEqual(true);
        //});

    });

});

