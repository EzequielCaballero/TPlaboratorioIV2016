angular.module('ABMangularAPI.controladorLocalOpciones', [])  
  app.controller('controlLocalOpciones', function($scope, $http, $state, $auth, $stateParams) {

    //SI estoy en este menú quiere decir que ya hay una sesión activa, resta saber que usuario esta logueado.
    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
    {
       $state.go("inicio");
    }

    console.info("Parametro datos: ", $stateParams);

    $scope.redirigir = function(accion){
      switch(accion)
      {
        case "Productos":
          $state.go("usuario.registro");
          break;
        case "Ofertas":
            $state.go("usuario.perfil");
          break;
          
        case "Logout":
          $auth.logout();
          $state.go("inicio");
          break;
      }
    }
});