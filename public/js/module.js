"use strict";
angular.module('routespiration', ['uiGmapgoogle-maps', 'ngComponentRouter', 'ngStorage', 'activity'
  , 'start', "activities", "map" , "login" ])
  .value('$routerRootComponent', 'app')

  .component('app', {
    template:

    '<ng-outlet></ng-outlet>',
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
    $window.location.href = "https://www.strava.com/oauth/authorize?client_id=13016+&response_type=code&redirect_uri=http://localhost:3000/callback";

  }
}