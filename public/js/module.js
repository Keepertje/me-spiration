"use strict";
angular.module('routespiration', ['uiGmapgoogle-maps', 'ngComponentRouter', 'ngStorage'
  , 'start', "activities", "map" , "login" ])
  .value('$routerRootComponent', 'app')

  .component('app', {
    template:


  '<div>' +
    '<ng-outlet></ng-outlet></div>',
    controller: MainComponent,
    $routeConfig: [
      { path: '/start', name: 'Start', component: 'start', useAsDefault: true },
      { path: '/activities', name: 'Activities', component: 'activities' },
      { path: '/callback', name: 'Callback', component: 'login' }
    ]
  });


function MainComponent($window, userService, $localStorage, $rootRouter) {


}