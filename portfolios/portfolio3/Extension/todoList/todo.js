var app = angular.module('todo', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm",
        controller : "mainCtrl"
    });
});