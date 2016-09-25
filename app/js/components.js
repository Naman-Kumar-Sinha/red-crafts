'use strict';

angular.module('components', [])

    .directive('menu', function () {
        return {
            restrict: 'E',
            transclude: false,
            scope: {},
            controller: 'menuCtrl',
            templateUrl: 'partials/menu.html',
            replace: true
        };
    })

    .directive('tabs', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: 'tabsCtrl',
            templateUrl: 'partials/tabs.html',
            replace: true
        };
    })
 
      .directive('pane', function () {
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