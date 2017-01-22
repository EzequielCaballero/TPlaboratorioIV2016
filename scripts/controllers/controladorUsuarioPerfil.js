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

    //DEFINIR VISTA PERFIL (PERSONAL O DE TERCERO)
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
      console.info("Usuario traido: ", $scope.usuarioElegido);
    });

    //DATOS A ENVIAR
    $scope.usuarioEnviar = {};
    $scope.usuarioEnviar.id = Number($scope.traer);

    //CAMBIAR ESTADO DE USUARIO
    $scope.Actualizar=function(){
      
      if($scope.usuarioElegido.estado == "activo")
        $scope.usuarioEnviar.estado = "inactivo";
      else
        $scope.usuarioEnviar.estado = "activo";

      console.info("Usuario a enviar: ",  $scope.usuarioEnviar);

      servicioRetornoUsuarios.ABM_Usuario($scope.usuarioEnviar, "Modificar").then(function(respuesta){
          $scope.refrescarEstado();
          $state.go("usuario.perfil");
          console.info("RETORNO: ",respuesta.data);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
    }

    $scope.refrescarEstado=function(){
      $scope.usuarioElegido.estado = $scope.usuarioEnviar.estado;
    }
});