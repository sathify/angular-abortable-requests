'use strict';

describe('Util', function () {
  var Util, $rootScope;

  beforeEach(module('ng-abortable-requests'));

  beforeEach(inject(function(_$rootScope_, _Util_) {
    Util = _Util_;
    $rootScope = _$rootScope_;
  }));

  describe('.disuniteHttp()', function() {
    var str = 'http://foo.com/:dummy';

    it('has the api defined', function() {
      expect(Util.disuniteHttp).toBeDefined();
    });

    it('has correct protocol and url parts', function() {
      var uri = Util.disuniteHttp(str);
      expect(uri.protocol).toBe('http://');
      expect(uri.url).toBe('foo.com/:dummy');
    });

  });

});
