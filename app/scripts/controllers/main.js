'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('MainCtrl', function (serverUrl, $http) {

  	// $http
  	// 	.get(serverUrl)
  	// 	.then(function(data) {
  	// 		console.log(data.data);
  	// 	});
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
