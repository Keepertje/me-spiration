"use strict";
angular.module('routespiration', ['uiGmapgoogle-maps', 'ngComponentRouter', 'ngStorage'
  , 'start', "activities", "map" , "login" ])
  .value('$routerRootComponent', 'app')

  .component('app', {
    template:

 ' <div class="header">' +
    ' <h1>Routes4Me</h1>' +
    ' <h3>Where did you go?</h3>' +
     ' <button ng-if="$ctrl.$storage.userToken === undefined" class="stravaButton" ng-click="$ctrl.login()"></button>' +
        '<button ng-if="$ctrl.$storage.userToken !== undefined" class="logoutButton" ng-click="$ctrl.logout()">Logout</button></div>' +
    '</div>' +
  '<div>' +
    '<ng-outlet></ng-outlet></div>',
    controller: MainComponent,
    $routeConfig: [
      { path: '/start', name: 'Start', component: 'start', useAsDefault: true },
      { path: '/activities', name: 'Activities', component: 'activities' },
      { path: '/callback', name: 'Callback', component: 'login' }
    ]
  });


function MainComponent($window, userService, $sessionStorage, $rootRouter) {

    var $ctrl = this;
  // $ctrl.loggedIn = userService.isLoggedIn();
  $ctrl.$storage = $sessionStorage;


  $ctrl.logout = function () {
    userService.logout();
  }
  $ctrl.login = function () {
    $window.location.href = "https://www.strava.com/oauth/authorize?client_id=13016+&response_type=code&redirect_uri=http://me.routespiration.com/callback";

  }
}