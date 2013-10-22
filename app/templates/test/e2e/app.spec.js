describe('My Site', function () {

  'use strict';

  var ptor = protractor.getInstance();

  beforeEach(function () {
    ptor.get('/');
  });

  it('correct title', function () {

    // variant 1
    expect(ptor.getTitle()).toEqual('My Site');

    // variant 2
    var title = ptor.getTitle();
    expect(title).toEqual('My Site');

    // variant 3
    ptor.getTitle().then(function (title) {
      expect(title).toEqual('My Site');
    });

  });

});
