angular.module('routespiration')
    .factory('userService',function($http, $localStorage){


    logout = function() {
        $localStorage.$reset();
   
    }
    setUser = function(userInput){
        
        $localStorage.user = userInput;
        
    }

    isLoggedIn = function(){
    
        return($localStorage.user !== null && $localStorage.user !== undefined );
    }

    getUser = function(){
        return $localStorage.user;
    }

    setToken = function(token){
        $localStorage.userToken = token
      
    }
    getToken = function(){
        return $localStorage.userToken;
    }
    return {
      getUser:getUser,
      getToken:getToken,
      setUser:setUser,
      setToken:setToken,
      isLoggedIn:isLoggedIn,
      logout: logout
     };
});