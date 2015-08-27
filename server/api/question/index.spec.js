'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var questionCtrlStub = {
  index: 'questionCtrl.index',
  show: 'questionCtrl.show',
  create: 'questionCtrl.create',
  update: 'questionCtrl.update',
  destroy: 'questionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var questionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './question.controller': questionCtrlStub
});

describe('Question API Router:', function() {

  it('should return an express router instance', function() {
    questionIndex.should.equal(routerStub);
  });

  describe('GET /api/questions', function() {

    it('should route to question.controller.index', function() {
      routerStub.get
                .withArgs('/', 'questionCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/questions/:id', function() {

    it('should route to question.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'questionCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/questions', function() {

    it('should route to question.controller.create', function() {
      routerStub.post
                .withArgs('/', 'questionCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/questions/:id', function() {

    it('should route to question.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'questionCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/questions/:id', function() {

    it('should route to question.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'questionCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/questions/:id', function() {

    it('should route to question.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'questionCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
