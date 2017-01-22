 angular.module('ABMangularAPI.controladorUsuarioPerfil', []) 
  app.controller('controlUsuarioPerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoUsuarios) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
    }

    $scope.botonActualizar = true;
    console.info("Parametro: ", $stateParams);

    $scope.DatoRegistro="***PERFIL USUARIO***";
    if($sesion.perfil == "Administrador" || $sesion.perfil == "Encargado")
    {
      $scope.botonActualizar = false;
      $scope.DatoSubmit = "Cambiar estado";
    }

    //DEFINIR VISTA PERFIL PERSONAL O TERCERO
    if($stateParams.id != "")
    {
      $scope.traer = $stateParams.id;
      $scope.dondeVolver = "usuario.grilla";
      if($stateParams.id == $sesion.usuario)
        $scope.botonActualizar = true;
    }
    else
    {
        $scope.traer = $sesion.usuario;
        $scope.botonActualizar = true;
        $scope.dondeVolver = "usuario.menu";
    }
    
    //TRAER USUARIO
    $scope.usuarioElegido = {};

    servicioRetornoUsuarios.traerCiertosUsuarios($scope.traer).then(function(respuesta){
      $scope.usuarioElegido = respuesta.data;
      console.info($scope.usuarioElegido);
    });

    //CAMBIAR ESTADO DE USUARIO
    $scope.Actualizar=function(){
      
      servicioRetornoUsuarios.ABM_Usuario($scope.usuario, "Modificar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
          $state.go("usuario.grilla");
          console.info(respuesta.data);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
    }
});