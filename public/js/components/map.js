angular.module('map', [])
    .component('map', {
        template:
        "<ui-gmap-google-map center='$ctrl.map.center' zoom='$ctrl.map.zoom' events='$ctrl.map.events'>" +
        //options='$ctrl.map.options'
        ' <ui-gmap-search-box template="$ctrl.map.searchbox.template" events="$ctrl.map.searchbox.events"></ui-gmap-search-box>' +

        "<ui-gmap-polyline  ng-repeat='p in $ctrl.polylines' path='p.path'" +
        "stroke='p.stroke'" +
        " clickable='true'" +
        "draggable='false'" +
        " editable='false'" +
        "visible='true'" +
        "fit='false'" +
        "events='p.events'>" +
        "</ui-gmap-polyline>" +
        "</ui-gmap-google-map>",

        controller: MapComponent,
        bindings: {
            activities: '=',
            mapcenter: '&',

        }

    })

function MapComponent(uiGmapGoogleMapApi, $scope) {
    var $ctrl = this;
    $ctrl.defaultCenter = { latitude: 52.087492, longitude: 5.123289 };
   
    $ctrl.map = {
        //dummy center
        center: $ctrl.defaultCenter,
     
        zoom: 9,
        /*heatLayerCallback: function (layer) {
                //set the heat layers backend data
                var mockHeatLayer = new MockHeatLayer(layer);
                },
            showHeat: true,*/
        events: {
            click: function (map, event, model) {
                //this is super slow... Don not know why...
                var newLat = model[0].latLng.lat()
                var newLong = model[0].latLng.lng()
                setNewCoordinates(newLat, newLong);

            }
        },
        searchbox: {
            template: 'searchbox.tpl.html',
            events: {
                places_changed: function (searchBox) {
                    var newPlace = searchBox.getPlaces()[0];
                    var newLat = newPlace.geometry.location.lat()
                    var newLong = newPlace.geometry.location.lng()
                    setNewCoordinates(newLat, newLong);
                }
            }
        }

    };


    function setNewCoordinates(lat, long) {

        $ctrl.mapcenter({ newcenter: [lat, long] })
        $ctrl.map.center = { latitude: lat, longitude: long }
    }
    //How to do this... must be loaded already, but user still needs to log in.
    var polylineActivities = [];
    var previousSelected = {};
    setThePolylines();

    function setThePolylines() {
        polylineActivities = [];
        $ctrl.activities.forEach(function (element) {
            if (element.mapStuff) {
                polylineActivities.push(element.mapStuff);
            }
        })
        $ctrl.polylines = polylineActivities;
    };



    uiGmapGoogleMapApi.then(function () {


        if ((typeof navigator !== 'undefined') && // IE8 (and possible other browsers)
            (typeof navigator.geolocation !== 'undefined')) {

            navigator.geolocation.getCurrentPosition(function (position) {
                setNewCoordinates(position.coords.latitude, position.coords.longitude);

            }, function (failure) {
                if (failure.message.indexOf("Only secure origins are allowed") == 0) {
                    console.log('Geolocation (GPS) is not supported by Chrome version 50+ over http, you can try https://me-spiration.herokuapp.com instead');
                    $ctrl.map.center = $ctrl.defaultCenter
                }
            })
        }
        else {
            console.log('Geolocation (GPS) is not supported by this browser');
            $ctrl.map.center = $ctrl.defaultCenter
        }
    });

   var styleArray = [
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#aaaaaa"
                },
                {
                    "weight": 0.6
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#aaaaaa"
                },
                {
                    "weight": 0.6
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#d1dcd0"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#e6e5ec"
                }
            ]
        }
    ];

    $ctrl.map.options ={styles:styleArray}

}
