'use strict';

describe('Controller: QuestionsCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('paizaqaApp'));

  var QuestionsCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionsCreateCtrl = $controller('QuestionsCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
