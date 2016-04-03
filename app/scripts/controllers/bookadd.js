'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:BookaddCtrl
 * @description
 * # BookaddCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('BookaddCtrl',['$scope', '$http', 'serverUrl', function ($scope, $http, serverUrl) {
    
  	$scope.authors = [];
  	$scope.publishinghouses = [];
  	$scope.categories = [];

  	$http
  		.get(serverUrl + '/authors')
  		.then(function(data) {
  			$scope.authors = data.data;
  		});

  	$http
  		.get(serverUrl + '/publishinghouses')
  		.then(function(data) {
  			$scope.publishinghouses = data.data;
  		});

  	$http
  		.get(serverUrl + '/admin/category')
  		.then(function(data) {
  			$scope.category = data.data;
  		});


    $scope.selected = { value: $scope.authors[0] };


  }]);
