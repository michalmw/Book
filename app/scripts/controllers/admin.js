'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('AdminCtrl', function ($http, $scope, serverUrl) {

  	$scope.category = [];
    $scope.newCategory = {};
    $scope.newCategory.subcategory = [];

    $http
    		.get(serverUrl + '/admin/category')
    		.then(function(data) {
    			$scope.category = data.data;
    		});
    //kategorie

    $scope.addSub = function(sub) {
    	$scope.newCategory.subcategory.push(sub);
    	$scope.newCategory.subcategoryName = '';
    };

    $scope.addCategory = function(newCategory) {

    	console.log('wysylasz:', newCategory);
    	$http
    		.post(serverUrl + '/admin/category', newCategory)
    		.then(function(data){
    			console.log(data);

    		});
    		$scope.category.push(newCategory);
    		$scope.newCategory = {};
    };


    	
  });
