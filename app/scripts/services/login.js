'use strict';

/**
 * @ngdoc service
 * @name bookApp.login
 * @description
 * # login
 * Factory in the bookApp.
 */
angular.module('bookApp')
  .factory('login', function ($http,$location, serverUrl) {
      return {
        isLogged: function(data, scope) {
            $http
                .get(serverUrl + '/loggedin')
                .then(function(user) {
                    if(user.data == '0')
                        return false;
                    else
                        return true;
                });
        },
        isLoggedMenu: function() {
            return false;
        },
        user: function() {

        },
        wyloguj: function() {


            sessionService.destroy('user');
            $location.path('/login');
        }
    };
  });
