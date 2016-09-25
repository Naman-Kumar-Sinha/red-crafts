'use strict';

/* Services */

var services = angular.module('services', []);

services.service('SharedData', function () {
    return {
        search: ""
    };
});