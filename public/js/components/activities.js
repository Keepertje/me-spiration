angular.module('activities', [])
    .component('activities', {
        template: '<div>' + "<div class='topbar'>" +
        "<h1>Me - Routespiration</h1> <button ng-click='$ctrl.logoff()'> Log out </button>" +
        '</div>' +
        "<div class='content'> " +
        "<div class='container'>" +
        "<div class='row padd2'>" +
        " <div class='seven columns'> " +
        "<div ng-if='$ctrl.loading'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>" +
        '<span>Loading...</span></div>' +
        "<map ng-if='!$ctrl.loading' changed=$ctrl.change activities='$ctrl.activities' mapcenter='$ctrl.updatemap(newcenter)'></map></div>" +
  
        "<div class='five columns'><p ng-if='$ctrl.noActivityYet'>Click on an activity in the map for details</p>"+ 
        "<div><activity></activity></div>"+
        "</div>" + " </div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '</div>',

        controller: ActivitiesComponent

    })

function ActivitiesComponent(activitiesService, userService, $scope, $rootScope,$rootRouter) {
    var $ctrl = this;

    $ctrl.activities = [];

    $ctrl.loading = true;
    $rootScope.$on('activity', function(){
         $ctrl.noActivityYet = false;
    })
    $ctrl.noActivityYet = true;

    $ctrl.logoff = function () {
        userService.logout();
        $rootRouter.navigate(['Start']);
    }

    if (userService.isLoggedIn()) {
        if (activitiesService.getActivities().length < 1) {
            activitiesService.getActivitiesFromStrava()
                .then(function (response) {
                    $ctrl.activities = activitiesService.getActivities();

                    $ctrl.loading = false
                })
        }
        else {
            $ctrl.activities = activitiesService.getActivities();

            $ctrl.loading = false
        }
    };


    $ctrl.updatemap = function (newcenter) {

        $ctrl.mapCenter = newcenter;
    }


}
