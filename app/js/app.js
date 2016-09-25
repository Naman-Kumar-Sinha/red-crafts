'use strict';

// Declare app level module which depends on views, and components
angular.module('redCrafts', [
    'ngRoute',
    'controllers',
    'components',
    'filters',
    'services'
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
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        }).    
        when('/error', {
            templateUrl: 'partials/error.html',
            controller: 'errorCtrl'
        }).    
        otherwise({redirectTo: '/home'});
}]);
