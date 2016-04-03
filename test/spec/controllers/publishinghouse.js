'use strict';

describe('Controller: PublishinghouseCtrl', function () {

  // load the controller's module
  beforeEach(module('bookApp'));

  var PublishinghouseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublishinghouseCtrl = $controller('PublishinghouseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PublishinghouseCtrl.awesomeThings.length).toBe(3);
  });
});
