'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('RegisterCtrl', function ($scope, $http, serverUrl) {
    

    $scope.add = function(user) {
    	$http
    		.post(serverUrl + '/signup', user)
    		.then(function(info) {
    			$scope.komunikat = info;
    		});
    };
  });
