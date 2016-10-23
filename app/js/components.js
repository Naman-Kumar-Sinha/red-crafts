'use strict';

var components = angular.module('components', []);

components.directive('menu', function () {
    return {
        restrict: 'E',
        transclude: false,
        scope: {},
        controller: 'menuCtrl',
        templateUrl: 'partials/menu.html',
        replace: true
    };
});

components.directive('tabs', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: 'tabsCtrl',
        templateUrl: 'partials/tabs.html',
        replace: true
    };
});

components.directive('pane', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: { title: '@' },
        link: function (scope, element, attrs, tabsController) {
            tabsController.addPane(scope);
        },
        templateUrl: 'partials/pane.html',
        replace: true
    };
});

components.directive('smoothScroll', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var hash = attrs.href;
            elem.on('click', function (e) {
                e.preventDefault();
                angular.element('html, body').animate({
                    scrollTop: angular.element(hash).offset().top
                }, 800, function () {
                    //window.location.hash = hash;
                });
            });
        }
    };
});