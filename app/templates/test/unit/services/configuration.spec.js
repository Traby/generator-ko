describe('configuration service', function () {

    'use strict';

    beforeEach(module('koapp'));

    it('should be defined', inject(function (configuration) {
        expect(configuration).toBeDefined();
        expect(configuration.getAppName).toBeDefined();
    }));

});
