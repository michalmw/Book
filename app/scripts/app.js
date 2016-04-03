'use strict';

/**
 * @ngdoc overview
 * @name bookApp
 * @description
 * # bookApp
 *
 * Main module of the application.
 */
angular
  .module('bookApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'ui.select',
    'toaster'
  ])
  .constant('serverUrl', 'http://192.168.1.2/api')
  .config(['$routeProvider', function ($routeProvider) {
    //function check is logged
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/book', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl'
      })
      .when('/author', {
        templateUrl: 'views/author.html',
        controller: 'AuthorCtrl',
        controllerAs: 'author'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/author', {
        templateUrl: 'views/author.html',
        controller: 'AuthorCtrl',
      })
      .when('/publishinghouse', {
        templateUrl: 'views/publishinghouse.html',
        controller: 'PublishinghouseCtrl'
      })
      .when('/bookAdd', {
        templateUrl: 'views/bookadd.html',
        controller: 'BookaddCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
     
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            loggedin: checkLoggedin
        }
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
 
      .when('/authors', {
        templateUrl: 'views/authors.html',
        controller: 'AuthorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]).run(function($rootScope, login, session, $location) {

     $rootScope.$on('$routeChangeStart', function() {
      if(session.get('userId')) {
        $rootScope.isloggin = true;
        $rootScope.username = session.get('email');
      }
      else {
        $rootScope.isloggin = false;
        $rootScope.username = '';
      }

    });
       //menu is active
     $rootScope.getClass = function(url) {
        //if homepage
        if(url == '') {
          if($location.path() == '/') 
            return 'active';
          else
            return '';
        } else {
          return ($location.path().substr(0, url.length) === url) ? 'active' : '';

        }
     }
     
  });


var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, serverUrl){ 
    
      var deferred = $q.defer(); 
    
      $http
        .get(serverUrl + '/loggedin')
        .success(function(user){ 

        if (user !== '0') 
          deferred.resolve(); 
        else { 
          $rootScope.message = 'You need to log in.'; 
          deferred.reject(); 
          $location.url('/login'); 
        } 
      }); 
  return deferred.promise; 
}; 