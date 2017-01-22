 angular.module('ABMangularAPI.controladorUsuarioPerfil', []) 
  app.controller('controlUsuarioPerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoUsuarios) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
    }

    console.info($stateParams);

    $scope.DatoRegistro="***PERFIL USUARIO***";

    $scope.usuarioElegido = {};

    if($stateParams.id != "")
    {
      $scope.traer = $stateParams.id;
      $scope.dondeVolver = "usuario.grilla";
    }
    else
    {
      $scope.traer = $sesion.usuario;
      $scope.dondeVolver = "usuario.menu";
    }
    
    //TRAER USUARIO
    servicioRetornoUsuarios.traerCiertosUsuarios($scope.traer).then(function(respuesta){
      $scope.usuarioElegido = respuesta.data;
      console.info($scope.usuarioElegido);
    });

    $scope.DatoSubmit = "Cambiar estado";

    //CARGAR TABLA 
      $scope.usuario = {};
      $scope.usuario.id_usuario = $scope.usuarioElegido.id_usuario;
      $scope.usuario.nombre = $scope.usuarioElegido.nombre;
      $scope.usuario.apellido = $scope.usuarioElegido.apellido;
      $scope.usuario.email = $scope.usuarioElegido.email;
      $scope.usuario.edad = $scope.usuarioElegido.edad;
      $scope.usuario.correo = $scope.usuarioElegido.correo;
      $scope.usuario.direccion = $scope.usuarioElegido.direccion;
      $scope.usuario.clave = $scope.usuarioElegido.clave;
      $scope.usuario.tipo_user = $scope.usuarioElegido.tipo_user;
      $scope.usuario.estado = $scope.usuarioElegido.estado;

      console.info($scope.usuario);

    //CAMBIAR ESTADO DE USUARIO
    $scope.Guardar=function(){
      
      servicioRetornoUsuarios.ABM_Usuario($scope.usuario, "Modificar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
          $state.go("usuario.grilla");
          console.info(respuesta.data);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
    }
});