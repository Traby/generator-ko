describe('home controller', function () {

  'use strict';

  var scope, controller, cfg;

  beforeEach(function () {

    module('app');

    inject(function ($injector) {
      cfg = $injector.get('configuration');
      spyOn(cfg, 'getAppName').andCallThrough();
    });

    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('HomeCtrl', {
        $scope: scope,
        configuration: cfg
      });
    });

  });

  it('should be defined', function () {
    expect(cfg.getAppName).toHaveBeenCalled();
    expect(scope.title).toEqual('My App');
  });

});
