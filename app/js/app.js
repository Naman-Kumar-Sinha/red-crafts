'use strict';

// Declare app level module which depends on views, and components
angular.module('redCrafts', [
    'ngRoute',
    'controllers',
    'components'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/Home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        }).
        when('/Gallery', {
            templateUrl: 'partials/gallery.html',
            controller: 'galleryCtrl'
        }).
        when('/Create', {
            templateUrl: 'partials/create.html',
            controller: 'createCtrl'
        }).
        otherwise({redirectTo: '/Home'});
}]);
