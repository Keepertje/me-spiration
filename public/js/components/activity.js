angular.module('activity', [])
    .component('activity', {
        template: "<div ng-if='$ctrl.activityPresent' class='card'>" +
        '<ul><h3>{{$ctrl.activity.name}}</h3>' +
        '<li>{{$ctrl.activity.distance}}<span>km</span><div>Distance</div>' +
        '<li>{{$ctrl.activity.max_speed}}<span>km/h</span><div>Maximum speed</div></li>' + 
        '<li>{{$ctrl.activity.average_speed}}<span>km/h</span></i><div>Average speed</div></li>' + 
        '<li>{{$ctrl.activity.total_elevation_gain}}<span>m</span><div> Elevation</div></li>' +
        '<li> {{$ctrl.activity.timetobeat}}<div>Time</div></li>' +
        '<li>{{$ctrl.activity.pr_count}}<div>PRs</div></li>' + 
        '<li>{{$ctrl.activity.kudos_count}}<div>Kudos</div></li>' + 
        '<li>{{$ctrl.heartrate}}<div>Average Heartrate</div></li>' +
        '<li>{{$ctrl.activity.type}}<div>Type</div></li>' +
        '</ul>'+
        "<button class='small'><a ng-href='https://strava.com/activities/{{$ctrl.activity.id}}' target='_blank'>Show on Strava</a></button>" +
        "</div>",
        controller: ActivityComponent

    })

function ActivityComponent($scope, $rootScope, activitiesService) {

    var $ctrl = this;
     $ctrl.activityPresent = false;

    $rootScope.$on('activity', function (event, act) {
          $ctrl.activityPresent = true;
        $ctrl.activity = act;
        console.log($ctrl.activity)

        //fotos te klein
      /*  if ($ctrl.activity.total_photo_count > 0) {
            activitiesService.getPhotos($ctrl.activity.id).then(
                function (data) {
                    console.log(data);
                })

        }*/

        if($ctrl.activity.has_heartrate){
            $ctrl.heartrate= $ctrl.activity.max_heartrate
        }
        else{ $ctrl.heartrate = '-'}

    })
    //login the user then go to the search page.

}



