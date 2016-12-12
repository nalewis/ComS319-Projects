var app = angular.module('newsReader', ["ngRoute"]);

app.config( function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "newsReader.htm",
		controller : "mainCtrl"
	});
});
