'use strict';

describe('Filter: fromNow', function () {

  // load the filter's module
  beforeEach(module('paizaqaApp'));

  // initialize a new instance of the filter before each test
  var fromNow;
  beforeEach(inject(function ($filter) {
    fromNow = $filter('fromNow');
  }));

  it('should return the input prefixed with "fromNow filter:"', function () {
    var text = 'angularjs';
    expect(fromNow(text)).toBe('fromNow filter: ' + text);
  });

});
