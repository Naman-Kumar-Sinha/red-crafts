/*
    Guys like these save the day. Reusing the code from the blogpost.
    http://ravindersinghdang.blogspot.com/2013/04/convert-numbers-into-words-using.html
*/
'use strict';

var filters = angular.module('filters', []);

filters.filter('isEmptyObject', function() {
   return function(object) {
       return angular.equals({}, object);
   }; 
});

filters.filter('range', function() {
    return function(inputArray, total) {
        if(total && isInteger(total)) {
            total = parseInt(total);
            
            for (var i=1; i<= total; i++) {
                inputArray.push(i);
            }
            
            return inputArray;
        }
    };
});

function isInteger(x) {
    return x % 1 === 0;
}