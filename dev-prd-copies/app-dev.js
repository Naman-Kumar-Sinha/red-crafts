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

app.constant('FB_PARAMS', {
    'FB_APP_ID': '1812997352279992',
    'FB_APP_VERSION': 'v2.8',
    'FB_GRAPH_API_CALL': '/me?fields=first_name,age_range,gender,locale,picture,timezone',
    'FB_SCOPE': 'public_profile,user_friends,email',
    'FB_EVENT_LOGIN': 'auth.login',
    'FB_EVENT_LOGOUT': 'auth.logout',
    'FB_CONNECTED': 'connected',
    'FB_UNAUTHORIZED': 'not_authorized'
});

app.config(['$locationProvider', '$routeProvider','ezfbProvider','FB_PARAMS', function ($locationProvider, $routeProvider, ezfbProvider, FB_PARAMS) {
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
    appId: FB_PARAMS.FB_APP_ID,
    status: true,
    channelUrl: 'app/channel.html',
    version: FB_PARAMS.FB_APP_VERSION
  }); 
}]);

app.run(['$rootScope', '$location', '$route', 'ezfb', function($rootScope, $location, $route, ezfb) {
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
}]);
