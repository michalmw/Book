'use strict';

/**
 * @ngdoc service
 * @name bookApp.session
 * @description
 * # session
 * Factory in the bookApp.
 */
angular.module('bookApp')
  .factory('session', function ($cookies) {
   return {
        put: function(key,value) {
            return $cookies.put(key, value);
        },
        get: function(key) {
            return $cookies.get(key);
        },
        destroy: function(key) {
            return $cookies.remove(key);
        }
    };
  });
