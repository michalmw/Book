'use strict';

describe('Controller: BookaddCtrl', function () {

  // load the controller's module
  beforeEach(module('bookApp'));

  var BookaddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookaddCtrl = $controller('BookaddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BookaddCtrl.awesomeThings.length).toBe(3);
  });
});
