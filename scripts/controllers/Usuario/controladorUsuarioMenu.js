angular.module('ABMangularAPI.controladorUsuarioMenu', [])  
  app.controller('controlUsuarioMenu', function($scope, $http, $state, $auth) {

    //SI estoy en este menú quiere decir que ya hay una sesión activa, resta saber que usuario esta logueado.
    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);
    $scope.esAdministrador = false;

    if(!$auth.isAuthenticated())
       $state.go("inicio");
    else
    {
      if($sesion.perfil == "Administrador")
        $scope.esAdministrador = true;
    }

    $scope.redirigir = function(accion){
      switch(accion)
      {
        case "Usuario_alta":
          $state.go("usuario.registro");
          break;
        case "Local_alta":
          $state.go("local.alta");
          break;
        case "Grilla_Usuarios":
          $state.go("usuario.grilla");
          break;
        case "Grilla_Locales":
          $state.go("local.grilla");
          break;
        case "Grilla_Usuarios_Directiva":
          $state.go("usuario.directivaGrilla");
          break;
          
        case "Logout":
          $auth.logout();
          $state.go("inicio");
          break;
      }
    }
  });