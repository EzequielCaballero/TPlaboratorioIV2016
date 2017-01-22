angular.module('ABMangularAPI.controladorUsuarioMenu', [])  
  app.controller('controlUsuarioMenu', function($scope, $http, $state, $auth) {

    //SI estoy en este menú quiere decir que ya hay una sesión activa, resta saber que usuario esta logueado.
    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
    {
       $state.go("inicio");
    }

    $scope.redirigir = function(accion){
      switch(accion)
      {
        case "Registrarse":
          $state.go("usuario.registro");
          break;
        case "Perfil":
            $state.go("usuario.perfil");
          break;  
        case "Grilla":
            $state.go("usuario.grilla");
          break;
        case "GrillaDirectiva":
            $state.go("usuario.directivaGrilla");
          break;
          
        case "Logout":
          $auth.logout();
          $state.go("inicio");
          break;
      }
    }
  });