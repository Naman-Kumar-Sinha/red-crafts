# red-crafts
Github Repository for [RedCrafts] (www.redcrafts.com)

If you agree to the [Terms of Services] (https://help.github.com/articles/github-terms-of-service/), then you can fork and clone this repository only for academic purpose and not for commercial use.

**red-crafts** is a full fledged `AngularJS` based project. Tune in to see the updates to this repo.

## Getting started with project

Awesome! :+1: So now that you understand the terms, please read the documentation which will give you a jump start to start with this project.

### Features
    1. The project demonstrates powerful Angular 1.5.8 in action.
    2. Usage of Third part Facebook API - [ezfb] (https://github.com/pc035860/angular-easyfb) for authentication\login.
    3. Powerful custom built directives.
    4. [Bootstrap] (http://getbootstrap.com/) Powered Gallery.

#### A Note on ezfb
Okay! First things first.  We love this library. The guys did a terrific job. :+1:

To put it in simple words. ezfb is a wrapper around [Facebook JavaScript SDK] (https://developers.facebook.com/docs/javascript) built for AngularJS. We strongly recommend to read the ezfb [documentation] (https://github.com/pc035860/angular-easyfb) for any update on the sample usages.

##### Sample Usage

Inject the ezfb dependecy in your angular module as shown below:
```sh
//yourApp is the ng-app
var app = angular.module('yourApp', ['ezfb']);
```

Initialize the ezfbProvider in config:
```sh
app.config(['ezfbProvider', function (ezfbProvider) {
    ezfbProvider.setInitParams({
    appId: 'your-facebook-app-id',
    status: true,
    channelUrl: 'your-channel-url',
    version: 'your-facebook-app-version'
  }); 
}]);
```
At this point, you are done with the basic setup. But do note that we have not made any [Facebook GRAPH API] (https://developers.facebook.com/docs/graph-api) calls. So, let's say you want to know if the user is still logged - in after the page refresh or route change event, then you can do something like below.

Get the login status of user on route change\page refresh:
```sh
app.run( function($rootScope, $location, $route, ezfb) {    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (!current) {
            // handle session start event
            ezfb.getLoginStatus(function(response) {
                $rootScope.loginStatus = response;
            });
        }
    });
});
```

Yeah! We know that `angular` is supposed to be used for **Single Page Applications**, then why we are handling a page refresh event when it's all about hash change. :confused:
Ever heard of something called as negative scenarios? Great! now you got it. :grinning:

Note that `ezfb` is injected as a service dependency here. And the method used `getLoginStatus()` is the same one that can also be used by [Facebook JavaScript SDK] (https://developers.facebook.com/docs/javascript).

```sh
FB.getLoginStatus(function(response) {/*...*/});
```

`ezfb` is just a good way of making your [Facebook GRAPH API] (https://developers.facebook.com/docs/graph-api) calls `angular` ready. This is also listed in [Angular 1 Resources] (https://docs.angularjs.org/guide/external-resources) and recommended by [Facebook SDK note on AngularJS] (https://developers.facebook.com/docs/javascript/howto/angularjs).



**Note:**
* To know more about Github operations, visit [Github Basics] (https://git-scm.com/book/en/v2/Getting-Started-Git-Basics).
* You can find full documentation of application [here] (https://github.com/Naman-Kumar-Sinha/red-crafts/wiki).
* If you find any issues with the repo, please open an issue or reach out to [me] (https://github.com/Naman-Kumar-Sinha/)
* Refer to CDN for the libraries included in index.html rather than repo copies.

## Licence
[MIT Licence] (https://github.com/Naman-Kumar-Sinha/red-crafts/blob/master/LICENSE)

&copy; Copyright 2016 RedCrafts<sup>TM</sup>.