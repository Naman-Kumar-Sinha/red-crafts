'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('redCrafts', [
    'ngRoute',
    'controllers',
    'components',
    'filters',
    'services',
    'ezfb'
]);

app.config(['$locationProvider', '$routeProvider','ezfbProvider', function ($locationProvider, $routeProvider, ezfbProvider) {
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
        when('/profile', {
            templateUrl: 'partials/profile.html',
            controller: 'profileCtrl'
        }).
        when('/error', {
            templateUrl: 'partials/error.html',
            controller: 'errorCtrl'
        }).
        otherwise({redirectTo: '/home'}); 
    
    ezfbProvider.setInitParams({
    appId: '1812997352279992',
    status: true,
    channelUrl: 'app/channel.html',
    // Module default is `v2.6`.
    // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
    // https://developers.facebook.com/docs/javascript/reference/FB.init
    version: 'v2.8'
  }); 
}]);

app.run( function($rootScope, $location, $route, ezfb) {
    $rootScope.$watch(function() { 
        return $location.path(); 
    },
    function(path){  
        if(path === '/login') {
            if(angular.isDefined($rootScope.loginStatus) && $rootScope.loginStatus.status === 'connected') {
                $location.path('/');
            }
            angular.element('body').removeClass('no-cover').addClass('transparent-body');
            angular.element('html').removeClass('no-cover error-cover create-cover').addClass('login-cover');
        } else if(path === '/profile') {
            if(angular.isDefined($rootScope.loginStatus) && $rootScope.loginStatus.status != 'connected') {
                $location.path('/login');
            }
            angular.element('body').removeClass('no-cover').addClass('transparent-body');
            angular.element('html').removeClass('no-cover error-cover create-cover').addClass('profile-cover');
        } else if(path === '/create') {
            angular.element('body').removeClass('no-cover').addClass('transparent-body');
            angular.element('html').removeClass('no-cover error-cover login-cover').addClass('create-cover');
        } else if(path === '/error') {
            angular.element('body').removeClass('no-cover').addClass('transparent-body');
            angular.element('html').removeClass('no-cover create-cover login-cover').addClass('error-cover');
        } else {
           angular.element('html, body').removeClass('login-cover error-cover create-cover transparent-body').addClass('no-cover');
        }
    });
    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!current) {
            // handle session start event
            ezfb.getLoginStatus(function(res) {
                $rootScope.loginStatus = res;
            });
        }
    });
});
