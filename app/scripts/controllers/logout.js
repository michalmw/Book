'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('LogoutCtrl', function (toaster, serverUrl, $scope, $location, $http, session) {
    
    toaster.pop('note', "Trwa wylogowanie", "Zaraz zostaniesz wylogowany");


    $http
    	.get(serverUrl + '/logout')
    	.then(function(data) {
    		toaster.pop('success', "Zostałeś zalogowany", "Zapraszamy ponownie");
    		session.destroy('userId');
    		$location.path('/');
    	});
  });
