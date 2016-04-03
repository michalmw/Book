'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:PublishinghouseCtrl
 * @description
 * # PublishinghouseCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('PublishinghouseCtrl', function (toaster, $http, $scope, serverUrl) {

    $scope.publishing = [];
    download();
  	$scope.addNew = function(item) {
  		$http
  			.post(serverUrl + '/publish', item)
  			.then(function(data) {
          $scope.publish = '';
          toaster.pop('success', "Poprawnie dodano", item.name);
          download();
  			});
  	};
    function download() {
     	$http
     		.get(serverUrl + '/publishinghouses')
     		.then(function(data) {
     			$scope.publishing = data.data;
     		});
    }
    $scope.delete = function(id) {
      $http
        .delete(serverUrl + '/publishinghouse/' + id)
        .then(function(data) {
          toaster.pop('error', "Poprawnie Usunięto");

          download();
        });
    };

  });