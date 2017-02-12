angular.module('ABMangularAPI.controladorUsuarioEstadisticas', [])  
  app.controller('controlUsuarioEstadisticas', function($scope, $http, $state, $auth) {

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
        case "ventas_local":
          break;
        case "ventas_empleado":
          break;  
        case "ventas_fechas":
          break;
        case "ventas_dia":
          break;
        case "compras_cliente":
          break;
        case "registro_sesiones":
          break;
        case "encuesta_estadistica":
          break;
          
        case "Logout":
          $auth.logout();
          $state.go("inicio");
          break;
      }
    }
  });