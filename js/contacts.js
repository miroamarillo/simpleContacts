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
			.when('/',
			{
				templateUrl: 'views/list.html'
			})
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
	.directive('contenteditable', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModel) {

	      element.bind('blur change', function() {
	        scope.$apply(function() {
	          ngModel.$setViewValue(element.html());
	        });
	      });

	      ngModel.$render = function() {
	        element.html(ngModel.$viewValue);
	      };
	    }
	  }
	});