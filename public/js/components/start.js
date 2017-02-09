angular.module('start', [])

  .component('start', {
    template: "<div class='landingpage'> " +
    "<div class='information'><h1>Me - Routespiration</h1>" +
    "<p>View the activities of your past!</p>" +
    "<p>To find other activities in your area please use <a href='http://www.routespiration.com' target='_blank'>Routespiration</a>!</p>" +
    "<button class='button-primary' ng-click='$ctrl.login()'>Log in with Strava </button></div>" +
    "</div>",
    controller: StartComponent
  })

function StartComponent($window, userService, $localStorage, $rootRouter) {
  var $ctrl = this;
  // $ctrl.loggedIn = userService.isLoggedIn();
  $ctrl.$storage = $localStorage;

  if(userService.isLoggedIn()){
 
     $rootRouter.navigate(['Activities']);
  }

  $ctrl.logout = function () {
    userService.logout();
  }
  $ctrl.login = function () {
    $window.location.href = "https://www.strava.com/oauth/authorize?client_id=13016+&response_type=code&redirect_uri=http://localhost:3000/callback";

  }
}