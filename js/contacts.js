/**
* contacts Module
*
* Description
*/
angular.module('contacts', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider
			.when('/contact/:index',
			{
				templateUrl: 'views/edit.html',
				controller: 'Edit'
			})
			.when('/add', {
				templateUrl: 'views/edit.html',
				controller: 'Add'
			})
			.when('/delete/:index', {
				templateUrl: 'views/edit.html',
				controller: 'Delete'
			})
			.when('/',
			{
				templateUrl: 'views/list.html'
			});
			// .otherwise({ redirectTo: '/'});
	}])
	.controller('Contacts', ['$scope','$http', function($scope, $http){
		$http({
			method: 'GET',
			url: 'js/data.js',
			cache: true
		})
		.success(function(data){
				$scope.contacts = data;
		})
		.error(function(data) {
		  $scope.contacts = data || "Request failed";
		});
	}])
	.controller('Edit', ['$scope', '$routeParams', function($scope, $routeParams){
		$scope.contact = $scope.contacts[$routeParams.index];
		$scope.index = $routeParams.index;
	}])
	.controller('Add', ['$scope', '$routeParams', function($scope, $routeParams){
		//need to optimize this with a loop.  This can NOT be hardcoded.
		var length = $scope.contacts.push({
			id : $scope.contacts.length,
			isActive : true,
			balance: 0.00,
			picture: 'http://placehold.it/32x32',
			age: 'Set age',
			eyeColor: 'eye colour',
			name: 'Name',
			gender: '',
			company: 'Company name',
			email: 'Email address',
			phone: "+1 (883) 596-2894",
			city: 'City',
			country: 'Country',
			address: 'Address, Town, Province, Country',
			registered: Date(),
			latitude: 14.55627,
			longitude: -116.877177
		});
		$scope.contact = $scope.contacts[length -1];
		$scope.index = length - 1;
	}])
	.controller('Delete', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){
		$scope.contacts.splice($routeParams.index, 1);
		//This new service will replace the URL and send the user to the home page
		$location.path('/').replace();
	}])
	.filter('cleanSearch', function(){
		//This filter will make the search to be on consecutive characters
		return function(input){
			return input.substr(0, input.length).toLowerCase() == input.toLowerCase();
		}
	})
	.directive('contenteditable', function() {
	  return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			//Add directive to tables to manipulate them for responsiveness
			//Maybe this should be on its own directive
			$('table').attr('ng-directive', 'onTable');
			element.bind('blur change', function() {
				scope.$apply(function() {
					ngModel.$setViewValue(element.html());
				});
			});

			ngModel.$render = function() {
				element.html(ngModel.$viewValue);
			};
		}
	  };
	});
