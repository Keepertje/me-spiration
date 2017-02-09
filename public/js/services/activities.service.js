angular.module('routespiration')
    .factory('activitiesService', function ($http, userService) {
        var activityColour = {
            "Ride": '#AA0000',
            "Run": '#151177', "Hike": '#343477', "Walk": '#006666',

            "InlineSkate": '#6F006F'
        }

        var url = '/api/activities/';
        var urlSingle = '/api/activity/'
        var urlPhoto = '/api/photos/'
        var activities = [];

        getActivitiesFromStrava = function () {
            var getData = $http.get(url + '' + userService.getToken()).then(function (response) {
                activities = (response.data)
                    .filter(function (element) {

                        return (!element.manual && element.map.summary_polyline !== null);
                    });


                angular.forEach(activities, function (value, key) {
                    var encodedPolyLine = value.map.summary_polyline;
                    var decodedPolyLine = google.maps.geometry.encoding.decodePath(encodedPolyLine)

                    value.polyline = decodedPolyLine;
                    value.distance = ((value.distance - 0) / 1000).toFixed(2);
                    value.max_speed = (value.max_speed * 3.6).toFixed(2);;
                    value.average_speed = (value.average_speed * 3.6).toFixed(2);;
                    value.timetobeat = hhmmss(value.moving_time);
                    if (activityColour[value.type]) {
                        value.color = activityColour[value.type];
                    }
                    else {
                        value.color = '#000'
                    }

                    value.mapStuff =
                        {

                            id: value.id,
                            path: decodedPolyLine,
                            stroke: {
                                color: value.color,
                                weight: 3,
                                opacity: 0.6
                            }
                        }
                })
            }, function (res) {
                if (res.status === 401) {
                    userService.logout();
                }
            })
            return getData;
        }
        function pad(str) {
            return ("0" + str).slice(-2);
        }
        function hhmmss(secs) {
            var minutes = Math.floor(secs / 60);
            secs = secs % 60;
            var hours = Math.floor(minutes / 60)
            minutes = minutes % 60;
            return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
        }

        getPhotosActivity = function (actId) {

            var data = $http.get(urlPhoto + '' + actId + '/' + userService.getToken()).then(function (response) {
                var photoinfo = (response.data)
                console.log(photoinfo);

            }, function (res) {
                if (res.status === 401) {
                    userService.logout();
                }
            })
            return data;
        }


        getActivities = function () {
            return activities
        }

        return {
            getActivities: getActivities,
            getActivitiesFromStrava: getActivitiesFromStrava,
            getPhotos: getPhotosActivity

        };


    });