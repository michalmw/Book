'use strict';

/**
 * @ngdoc function
 * @name bookApp.controller:AuthorCtrl
 * @description
 * # AuthorCtrl
 * Controller of the bookApp
 */
angular.module('bookApp')
  .controller('AuthorCtrl', function ($rootScope, $scope, serverUrl, $http, Upload, $window, $filter) {
	$scope.author = {};
	$scope.author.nick = [];

	//download category
	$http
		.get(serverUrl + '/admin/category')
		.then(function(data){
			$scope.categories = data.data;
		});

	


	$scope.addNickname = function(name) {
		$scope.author.nick.push(name);
		$scope.nickname = '';
	};

	$scope.addAuthor = function(author, file) {
			
			var newName = $filter('spaceless')(author.name)+'.'+file.name.split('.').pop();
			Upload.rename(file,newName);
	  	Upload.upload({
                url: serverUrl + '/author',
                arrayKey: '',
                data: {
                    file: file,
                    author: author
                }
            }).then(function (resp) { 
                console.log(resp);//upload function returns a promise
                if (resp.data.error_code === 0) { //validate success
                    $window.alert('Poprawnie dodano');
                    $window.location.reload();
                } else {
                    $window.alert('Nie dodano');
                }
            }, function (resp) { //catch error
                // console.log('Błąd: ' + resp.status);
                // $window.alert('Błąd: ' + resp.status);
            }, function (evt) {
                // console.log(evt);
                // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });

				$scope.authors.push(author);

	};

  }).filter('spaceless',function() {
    return function(input) {
        if (input) {
            input=input.replace(/\s+/g, '_');
            input=input.replace(/ą/ig, 'a');
            input=input.replace(/Ą/ig, 'A');
            input=input.replace(/Ę/ig, 'E');
            input=input.replace(/ę/ig, 'e');
            input=input.replace(/ć/ig, 'c');
            input=input.replace(/Ć/ig, 'C');
            input=input.replace(/Ś/ig, 'S');
            input=input.replace(/ś/ig, 's');
            input=input.replace(/ł/ig, 'l');
            input=input.replace(/Ł/ig, 'L');
            input=input.replace(/Ń/ig, 'Ń');
            input=input.replace(/ń/ig, 'n');
            input=input.replace(/Ó/ig, 'O');
            input=input.replace(/ó/ig, 'o');
            input=input.replace(/Ż/ig, 'Z');
            input=input.replace(/ż/ig, 'z');
            input=input.replace(/ź/ig, 'z');
            input=input.replace(/Ź/ig, 'Z');
            input=input.replace(/\[.*?\]/g,'')
            input=input.replace("\\]", '_');
            
            
            return input;     
        }
    }})
