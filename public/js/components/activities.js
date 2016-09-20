angular.module('activities', [])
    .component('activities', {
        template:
        "<section>" +
        "<div ng-if='$ctrl.loading'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>" +
        '<span>Loading...</span></div>' +
       "<section><div><map ng-if='!$ctrl.loading' changed=$ctrl.change activities='$ctrl.activities' mapcenter='$ctrl.updatemap(newcenter)'></map></div></section>" +
    
        "</section>",

        controller: ActivitiesComponent

    })

function ActivitiesComponent(activitiesService, userService, $scope) {
    var $ctrl = this;

    $ctrl.activities = [];
  
    $ctrl.loading = true;

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
