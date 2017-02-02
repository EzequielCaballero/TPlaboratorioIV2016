 angular.module('ABMangularAPI.controladorClientePerfil', []) 
  app.controller('controlClientePerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoUsuarios) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
        $scope.traer = $sesion.usuario;
    }

    $scope.botonActualizar = true;
    console.info("Parametro: ", $stateParams);

    $scope.DatoRegistro="***PERFIL USUARIO***";
    
    //TRAER USUARIO
    $scope.usuarioElegido = {};

    servicioRetornoUsuarios.traerCiertosUsuarios($scope.traer).then(function(respuesta){
      $scope.usuarioElegido = respuesta.data;
      if($scope.usuarioElegido.estado == "activo")
        $("#estadoUserTabla").attr("style","color:green");
      else
        $("#estadoUserTabla").attr("style","color:red");
      //DATOS A ENVIAR
      console.info("Usuario traido: ", $scope.usuarioElegido);
    });


});