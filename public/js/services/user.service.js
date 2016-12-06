angular.module('routespiration')
    .factory('userService',function($http, $sessionStorage, $rootRouter){


    logout = function() {
        $sessionStorage.$reset();
         $rootRouter.navigate(['Start']);
    }

    setUser = function(userInput){
        $sessionStorage.user = userInput;
        
    }

    isLoggedIn = function(){
        return($sessionStorage.user !== null);
    }

    getUser = function(){
        return $sessionStorage.user;
    }

    setToken = function(token){
        $sessionStorage.userToken = token
      
    }
    getToken = function(){
        return $sessionStorage.userToken;
    }
    return {
      logout:logout,
      getUser:getUser,
      getToken:getToken,
      setUser:setUser,
      setToken:setToken,
      isLoggedIn:isLoggedIn
     };
});