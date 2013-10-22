describe('configuration service', function () {

  'use strict';

  beforeEach(module('app'));

  it('should be defined', inject(function (configuration) {
    expect(configuration).toBeDefined();
    expect(configuration.getAppName).toBeDefined();
  }));

  it('getAppName should return valid string', inject(function (configuration) {
    expect(configuration.getAppName()).toBeDefined();
    expect(configuration.getAppName()).not.toBeNull();
    expect(configuration.getAppName()).toBeTruthy();
  }));

});
