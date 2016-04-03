'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $http, serverUrl, $location, toaster, login, session) {
    
    //wywołanie błędy jeżeli przechodzi się z niezalogowanej strony
    if($rootScope.message != '' && $rootScope.message !== undefined ) {
        toaster.pop('error', "Brak dostępu", $rootScope.message);
        $rootScope.message ='';
    }
    

    $scope.login = function(user) {
    	$http
    		.post(serverUrl + '/login', user)
    		.then(function(data) {
    			if(data.data.status == 'OK') {
                    toaster.pop('success', "Poprawnie Zalogowano", "Witaj " + data.data.name);
                    session.put('email', data.data.name);
                    session.put('userId', data.data.id);
    				$location.path('/profile');
    			} else {
                    toaster.pop('error', "Błąd logowania", data.data);
                    $scope.user = '';
    			}
    		});
    };
  });
