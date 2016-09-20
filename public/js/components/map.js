angular.module('map', [])
    .component('map', {
        template:
        "<ui-gmap-google-map center='$ctrl.map.center' zoom='$ctrl.map.zoom' events='$ctrl.map.events'>" +
         //heatmaplayer
        //  '<ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="$ctrl.map.showHeat" onCreated="$ctrl.map.heatLayerCallback"></ui-gmap-layer>' +

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
    $ctrl.defaultCenter = { latitude: 52.087492, longitude:5.123289 };
   

    $ctrl.map = {
        //dummy center
        center: $ctrl.defaultCenter,
        zoom: 12,
        /*heatLayerCallback: function (layer) {
                //set the heat layers backend data
                var mockHeatLayer = new MockHeatLayer(layer);
                },
            showHeat: true,*/
        events: {
            click: function(map, event, model) { 
                //this is super slow... Don not know why...
                var newLat = model[0].latLng.lat()
                var newLong = model[0].latLng.lng()
                setNewCoordinates(newLat, newLong);

            }
        },
        searchbox: {
            template: 'searchbox.tpl.html',
            events: {
                places_changed: function(searchBox) {
                    var newPlace = searchBox.getPlaces()[0];
                    var newLat = newPlace.geometry.location.lat()
                    var newLong = newPlace.geometry.location.lng()
                    setNewCoordinates(newLat, newLong);
                }
            }
        }

    };

function MockHeatLayer(heatLayer) {
    // Not working yet
    var map, heatmap;
    var pointarray=[];
    
    $ctrl.activities.forEach(function(element){
       
        element.mapStuff.path.forEach(function(point){
            pointarray.push({location: new google.maps.LatLng(point.lat(), point.lng()), weight:5})
        })
       
    } );

   // var pointArray = new google.maps.MVCArray(taxiData);
    heatLayer.setData(pointarray);
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
        $ctrl.activities.forEach(function(element) {
            if (element.mapStuff) {
                polylineActivities.push(element.mapStuff);
            }
        })
        $ctrl.polylines = polylineActivities;
    };


   
    uiGmapGoogleMapApi.then(function() {


         if ((typeof navigator !== 'undefined') && // IE8 (and possible other browsers)
                (typeof navigator.geolocation !== 'undefined')) {

                navigator.geolocation.getCurrentPosition(function(position) {
                     setNewCoordinates(position.coords.latitude, position.coords.longitude);

                }, function(failure) {
                if(failure.message.indexOf("Only secure origins are allowed") == 0) {
                     console.log('Geolocation (GPS) is not supported by Chrome version 50+ over http, you can try https://routespiration.herokuapp.com instead');
                     $ctrl.map.center = $ctrl.defaultCenter
                  }
                 })
                }
    else {
        console.log('Geolocation (GPS) is not supported by this browser');
        $ctrl.map.center = $ctrl.defaultCenter
    }
    });

}
