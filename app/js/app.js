'use strict';

// Declare app level module which depends on views, and components
angular.module('rcApp', [
    'ngRoute',
    'rcControllers'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        }).
        when('/gallery', {
            templateUrl: 'partials/gallery.html',
            controller: 'galleryCtrl'
        }).
        when('/create', {
            templateUrl: 'partials/create.html',
            controller: 'createCtrl'
        }).
        otherwise({redirectTo: '/home'});
}]);
