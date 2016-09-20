angular.module('login', [])
  .component('login', {
    template: "<div><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>Login...</div>",
    controller:LoginComponent

  })

function LoginComponent($location,loginService,$rootRouter){

    //get the code from the url
    var code = $location.search().code;
    loginService.loginUser(code).then(function(data){
      $rootRouter.navigate(['Activities']);
     })
    //login the user then go to the search page.

}



