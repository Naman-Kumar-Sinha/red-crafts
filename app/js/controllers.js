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

controllers.controller('menuCtrl', ['$scope', '$element', '$http', 'SharedData', '$location', function ($scope, $element, $http, SharedData, $location) {    
    $http({
        method: 'GET',
        url: 'data/menu.json'
    }).then (function successCallback(response) {
        $scope.menuItems = response.data.menu;
    }, function errorCallback(response) {
        $location.path('/error');
    }); 
    
    $scope.sharedObj = SharedData;
    
    $scope.redirectToPath = function() {
        if($location.path() !== '/gallery') {
            $location.path('/gallery');
        }
        $location.path('/' + item.destination);
    };
    
    $scope.redirectToLogin = function() {
        $location.path('/login');  
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

controllers.controller('loginCtrl', function () {});