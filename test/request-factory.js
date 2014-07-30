'use strict';

describe('RequestFactory', function () {
  var RequestFactory,
    resourceConfig,
    $httpBackend;

  beforeEach(module('angular-abortable-requests'));

  //Takes the api from http/resource
  function abortRequestTest (api, output) {
     // abort the request
    api.abort();
    // on reject
    api.promise.catch(function(err){
      output = err;
    });

    $httpBackend.flush();
    expect(output).toEqual('ABORT');
  }

  function resolveRequestTest (api, output) {
    //on success/resolve
    api.promise.then(function(){
      output = 1;
    });

    $httpBackend.flush();
    expect(output).toEqual(1);
  }

  beforeEach(inject(function ($injector) {
    RequestFactory = $injector.get('RequestFactory');
    $httpBackend = $injector.get('$httpBackend');
    resourceConfig =  {
      url : '/proxy/test',
      options: null,
      actions : {
        get: { method: 'GET' }
      }
    };
  }));

  it('has its api defined', function() {
    expect(RequestFactory.createResource).toBeDefined();
    expect(RequestFactory.createHttpRequester).toBeDefined();
  });

  describe('.createResource()', function() {

    var rInstance;

    describe('functionalities', function () {

      beforeEach(function() {
        rInstance = RequestFactory.createResource(resourceConfig);
        $httpBackend.whenGET('/proxy/test')
          .respond(200, '');
      });

      it('returns a defined object with its api defined', function() {
        expect(rInstance).toBeDefined();
      });

      it('has an abort all api', function() {
        expect(rInstance.abortAll).toBeDefined();
      });

      describe('execute $resource', function (){

        it('method on $resource returns promise and abort api', function() {
          var res = rInstance.get();
          expect(res.promise).toBeDefined();
          expect(res.abort).toBeDefined();
        });

        it('returns a promise which can be aborted',
          function() {
          var res, output;
          res = rInstance.get();
          abortRequestTest(res, output);
        });

        it('returns a promise which resolves',
          function() {
          var res, output;

          res = rInstance.get();
          resolveRequestTest(res, output);
        });

      });

    });
  });

  describe('.createHttpRequester()', function() {

    var httpRequester;

    beforeEach(function() {
      httpRequester = RequestFactory
        .createHttpRequester({ method: 'GET', url: '/test'});
      $httpBackend.whenGET('/test')
          .respond(200, '');
    });


    it('returns a defined object with its api defined', function() {
      expect(httpRequester.execute).toBeDefined();
    });

    it('does have an abortAll api defined', function() {
      expect(httpRequester.abortAll).toBeDefined();
    });

    describe('.execute()', function() {

      it('return abort and promise api on execute', function() {
        var res = httpRequester.execute();
        expect(res.promise).toBeDefined();
        expect(res.abort).toBeDefined();
      });

      it('returns a promise which resolves',
        function() {
        var res, output;

        res = httpRequester.execute();
        resolveRequestTest(res, output);
      });

      it('returns a promise which can be aborted',
        function() {
        var res, output;

        res = httpRequester.execute();
        // abort the request
        abortRequestTest(res, output);
      });

    });

  });

});
