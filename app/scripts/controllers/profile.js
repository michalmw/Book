'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('ProfileCtrl', function ($scope, $http, serverUrl, $window) {
    

    // $http
    //     .get(serverUrl + '/profilee')
    //     .then(function(data) {
    //         console.log('callback:', data);
    //     });
    // $scope.user = {};
    // $scope.user._id = '56fd9b5b4a59869e1154e5a0';
    // $http
    // 	.post(serverUrl + '/profile', $scope.user)
    // 	.then(function(data) {
    //         console.log(data);
    // 		 // http://jakzaprogramowac.pl/pytanie/4044,redirect-with-node-js-and-angular
    // 		 // $window.location.href = data.redirect; 
    // 	});
  });
