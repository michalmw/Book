'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:AuthorsCtrl
 * @description
 * # AuthorsCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('AuthorsCtrl', function ($scope, $http, serverUrl,toaster) {
    
  	$scope.authors = [];
    //download authors
	downloadAuthors();

	$scope.delete = function(id) {
		$http
			.delete(serverUrl + '/author/' + id)
			.then(function(data) {
            	toaster.pop('success', "Usunięto z listy", "Usunięto z listy " + data.data.name);
            	downloadAuthors();
			});
	};

	function downloadAuthors() {
		console.log('dow');
		$http
		.get(serverUrl + '/authors')
		.then(function(data) {
			$scope.authors = data.data;
		});
	};
  });
