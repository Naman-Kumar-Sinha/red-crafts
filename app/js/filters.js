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

/*
//Not in use right now
filters.filter('words', function () {
  return function(value) {
    if (value && isInteger(value))
      return  toWords(value);
    
    return value;
  };

});

var th = ['','thousand','million', 'billion','trillion'];
var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine']; 
var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; 


function toWords(s)
{  
    s = s.toString(); 
    s = s.replace(/[\, ]/g,''); 
    if (s !== parseFloat(s)) return 'not a number'; 
    var x = s.indexOf('.'); 
    if (x === -1) x = s.length; 
    if (x > 15) return 'too big'; 
    var n = s.split(''); 
    var str = ''; 
    var sk = 0; 
    for (var i=0; i < x; i++) 
    {
        if ((x-i)%3==2) 
        {
            if (n[i] == '1') 
            {
                str += tn[Number(n[i+1])] + ' '; 
                i++; 
                sk=1;
            }
            else if (n[i]!=0) 
            {
                str += tw[n[i]-2] + ' ';
                sk=1;
            }
        }
        else if (n[i]!=0) 
        {
            str += dg[n[i]] +' '; 
            if ((x-i)%3==0) str += 'hundred ';
            sk=1;
        }


        if ((x-i)%3==1)
        {
            if (sk) str += th[(x-i-1)/3] + ' ';
            sk=0;
        }
    }
    if (x != s.length)
    {
        var y = s.length; 
        str += 'point '; 
        for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';
    }
    return str.replace(/\s+/g,' ');
}

//window.toWords = toWords;
*/