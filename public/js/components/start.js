    angular.module('start', [])
    .component('start', {
        template:
       '<div><button ng-if="$ctrl.$storage.userToken === undefined" class="stravaButton" ng-click="$ctrl.login()"></button>' +
        '<button ng-if="$ctrl.$storage.userToken !== undefined" class="logoutButton" ng-click="$ctrl.logout()">Logout</button>' +
        '</div>',

        controller: StartComponent
      

    })

function StartComponent($window, userService, $sessionStorage, $rootRouter) {
    '<button ng-if="$ctrl.$storage.userToken === undefined" class="stravaButton" ng-click="$ctrl.login()"></button>' +
    '<button ng-if="$ctrl.$storage.userToken !== undefined" class="logoutButton" ng-click="$ctrl.logout()">Logout</button>' +
    '</div>' 

    var $ctrl = this;
  // $ctrl.loggedIn = userService.isLoggedIn();
  $ctrl.$storage = $sessionStorage;


  $ctrl.logout = function () {
    userService.logout();
  }
  $ctrl.login = function () {
    $window.location.href = "https://www.strava.com/oauth/authorize?client_id=13016+&response_type=code&redirect_uri=https://me-spiration.herokuapp.com/callback";

  }
}