angular.module('routespiration')
    .factory('activitiesService', function($http, userService) {


        var url = '/api/activities/';
        var activities = [];

        getActivitiesFromStrava = function() {
            var getData = $http.get(url + '' + userService.getToken()).then(function(response) {
                console.log((response.data.length))
                activities = (response.data)
                    .filter(function(element) {

                        return (!element.manual && element.map.summary_polyline !== null);
                    });


                angular.forEach(activities, function(value, key) {
                    var encodedPolyLine = value.map.summary_polyline;
                    var decodedPolyLine = google.maps.geometry.encoding.decodePath(encodedPolyLine)
               
                    value.polyline = decodedPolyLine;
                
                    value.color = '#AA0000';

                    value.mapStuff =
                        {

                            id: value.id,
                            path: decodedPolyLine,
                            stroke: {
                                color: '#AA0000',
                                weight: 3
                            }
                        }
                })
            }, function(res) {
                if (res.status === 401) {
                    userService.logout();
                }
            })
            return getData;
        }

       
        

        getActivities = function() {
            return activities
        }

        return {
            getActivities: getActivities,
            getActivitiesFromStrava: getActivitiesFromStrava,

        };
    });