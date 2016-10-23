'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('homeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $http({
        method: 'GET',
        url: 'data/home.json'
    }).then (function successCallback(response) {
        $scope.inventory = response.data.inventory;
    }, function errorCallback(response) {
        $location.path('/error');
    });
                                   
    $scope.redirectToPath = function(item) {
        $location.path('/' + item.destination);
    };
}]);

controllers.controller('galleryCtrl', ['$scope', '$http', 'SharedData','$location', function ($scope, $http, SharedData, $location) {
    $scope.sharedObj = SharedData;
    $scope.previewClass = 'none';
    
    $http({
        method: 'GET',
        url: 'data/gallery.json'
    }).then (function successCallback(response) {
        $scope.inventory = response.data.inventory;
        $scope.lastIndex = $scope.inventory.length -1;
    }, function errorCallback(response) {
        $location.path('/error');
    });
    
    $scope.preview = function (index) {
        $scope.previewClass = 'block';
        $scope.currentIndex = index;
    };
    
    $scope.nextSlide = function () {
        if($scope.currentIndex === $scope.lastIndex) {
            $scope.currentIndex = 0;
        }else {
            $scope.currentIndex = $scope.currentIndex + 1;
        }
    };
    
    $scope.previousSlide = function () {
        if($scope.currentIndex === 0) {
            $scope.currentIndex = $scope.lastIndex;
        }else {
            $scope.currentIndex = $scope.currentIndex - 1;
        }
    };
    
    $scope.closePreview = function () {
        $scope.previewClass = 'none';
    };
    
    $scope.key = function($event) {
        if($event.keyCode === 39) {
            $scope.nextSlide();
        }else if($event.keyCode === 37) {
            $scope.previousSlide();
        }else if($event.keyCode === 27) {
            $scope.closePreview();
        } 
    };
}]);

controllers.controller('createCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $http({
        method: 'GET',
        url: 'data/apps.json'
    }).then (function successCallback(response) {
        $scope.inventory = response.data.inventory;
    }, function errorCallback(response) {
        $location.path('/error');
    });
}]);

controllers.controller('menuCtrl', ['$scope', '$rootScope', '$element', '$http', 'SharedData', '$location', 'ezfb', function ($scope, $rootScope, $element, $http, SharedData, $location, ezfb) {   
    //HTTP service to get menu items
    $http({
        method: 'GET',
        url: 'data/menu.json'
    }).then (function successCallback(response) {
        $scope.menuItems = response.data.menu;
    }, function errorCallback(response) {
        $location.path('/error');
    }); 
    
    //GET Shared Data from service
    $scope.sharedObj = SharedData;
    
    //Redirect to URL as per selected by menu. This is to support search from any page
    $scope.redirectToPath = function() {
        if($location.path() !== '/gallery') {
            $location.path('/gallery');
        }
        $location.path('/' + item.destination);
    };
    
    //ezfb Service library Event subscription code for Facebook login.
    ezfb.Event.subscribe('auth.login', function (res) {
        $rootScope.loginStatus = res;
        if(res.status === 'connected'){
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
        } else if (res.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your RedCrafts.
        } else {
            // the user isn't logged in to Facebook.
        }

        //res || angular.noop)();
    });
    
    //ezfb Service library Event subscription code for Facebook logout.
    ezfb.Event.subscribe('auth.logout', function (res) {
        $rootScope.loginStatus = res;
        if(res.status === 'connected'){
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
        } else if (res.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated to RedCrafts.
        } else {
            // the user isn't logged in to Facebook.
        }

        //res || angular.noop)();
    });
    
    //Redirection to Login
    $scope.redirectToLogin = function() {
        $location.path('/login');  
    };
    
    //Calling Facebook logout
    $scope.logout = function() {
        ezfb.getLoginStatus(function(res) {
            if(res.authResponse) {
                ezfb.logout(function(response) {
                    $location.path('/login');
                });
            } else {
                $location.path('/login');
            }
        });
    };
}]);

controllers.controller('tabsCtrl', ['$scope', '$element', function ($scope, $element) {
    var panes = $scope.panes = [];

    $scope.select = function (pane) {
        angular.forEach(panes, function (pane) {
            pane.selected = false;
        });
        pane.selected = true;
    };

    this.addPane = function (pane) {
        if (panes.length === 0) {
            $scope.select(pane);
        }
        panes.push(pane);
    };
}]);

controllers.controller('errorCtrl', function () {});

controllers.controller('loginCtrl', ['$scope','$location','ezfb', function ($scope, $location, ezfb) {
    $scope.fbLogin = function () {
        ezfb.login(function(res) {
            if(res.authResponse) {
                $location.path('/profile');
            }
        }, 
        {
            scope: 'public_profile,user_friends,email'
        });
    }
}]);

controllers.controller('profileCtrl', ['$scope','ezfb', function ($scope, ezfb) {
    ezfb.getLoginStatus(function (res) {
        if(res.status === 'connected') {
            ezfb.api('/me?fields=first_name,age_range,gender,locale,picture,timezone', function (me) {
                $scope.fbProfilePic = me.picture.data.url;
                $scope.firstName = me.first_name;
            });
        }
    });
}]);