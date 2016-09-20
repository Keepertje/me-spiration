angular.module('routespiration')
    .factory('loginService',function($http, userService, $q){


    var loginUrl = '/api/login';

   loginUser = function(code){
       
         var login = $http.get(loginUrl + '/' + code).then(function(response){
            var data = response.data;
             if(data.access_token !== undefined && data.access_token !== null){   
                userService.setUser(data.athlete);
                userService.setToken(data.access_token)
             }
         })

         return login;
    }

    //TODO logoutservice
    return {
      loginUser:loginUser
     };
});