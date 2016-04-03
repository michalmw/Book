'use strict';

describe('Controller: AutorsCtrl', function () {

  // load the controller's module
  beforeEach(module('bookApp'));

  var AutorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AutorsCtrl = $controller('AutorsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AutorsCtrl.awesomeThings.length).toBe(3);
  });
});
