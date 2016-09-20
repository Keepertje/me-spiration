angular.module('routespiration')
    .config(function($locationProvider,uiGmapGoogleMapApiProvider){//,$resourceProvider){
    $locationProvider.html5Mode(true);
    
    uiGmapGoogleMapApiProvider.configure({
          libraries: 'geometry,visualization'
      });
  // $resourceProvider.defaults.stripTrailingSlashes = false;
  
});