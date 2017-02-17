 angular.module('ABMangularAPI.controladorUsuarioPerfil', []) 
  app.controller('controlUsuarioPerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoUsuarios, servicioRetornoLocales) {

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
      $scope.botonActualizar = true;

    //DEFINIR VISTA PERFIL (PERSONAL O DE TERCERO)
    if($stateParams.id != "")
    {
      $scope.traer = $stateParams.id;
      $scope.dondeVolver = "usuario.grilla";
      if($stateParams.id == $sesion.usuario)
        $scope.botonActualizar = false;
    }
    else
    {
      if($usuarioLogueado != "Cliente")
      {
          $scope.traer = $sesion.usuario;
          $scope.botonActualizar = false;
          $scope.dondeVolver = "usuario.menu";
      }

    }
    
    //TRAER USUARIO
    $scope.usuarioElegido = {};

    servicioRetornoUsuarios.traerCiertosUsuarios($scope.traer).then(function(respuesta){
      $scope.usuarioElegido = respuesta.data;
      console.info("Usuario traido: ", $scope.usuarioElegido);
      //DATOS A ENVIAR
      $scope.usuarioEnviar = {};
      $scope.usuarioEnviar.id = Number($scope.traer);
      $scope.usuarioEnviar.estado = $scope.usuarioElegido.estado;
      $scope.refrescarEstado();

      if($scope.usuarioElegido.tipo_user == "administrador" || $scope.usuarioElegido.tipo_user == "cliente")
        $scope.verLocal = false;
      else
        $scope.verLocal = true;

      if($sesion.perfil == "Administrador" && $scope.usuarioElegido.tipo_user == "empleado")
      {
        $scope.botonNuevaLocacion = true;
        servicioRetornoLocales.traerTodo().then(function(respuesta){
            $scope.lista_locales = respuesta.data;
              //$state.go("usuario.perfil");
              console.info("Locales totales: ",$scope.lista_locales);

        },function errorCallback(response) {
              console.log("FALLO traer locales: ", response);
        });
      }
    
    },function errorCallback(response) {
              console.log("FALLO al traer usuario!: ", response);
    });

    //CAMBIAR ESTADO DE USUARIO
    $scope.Actualizar=function(queActualizar){
      
      if(queActualizar == "estado")
      {
          if($scope.usuarioElegido.estado == "activo")
            $scope.usuarioEnviar.estado = "inactivo";
          else
            $scope.usuarioEnviar.estado = "activo";

          console.info("Usuario a enviar: ",  $scope.usuarioEnviar);

          servicioRetornoUsuarios.ABM_Usuario($scope.usuarioEnviar, "Modificar").then(function(respuesta){
              $scope.refrescarEstado();
              $state.go("usuario.perfil");
              console.info("RETORNO usuario: ",respuesta.data);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });
      }
      else
      {
         //alert("Local elegido: " + queActualizar);
         $scope.usuarioElegido.id_local = queActualizar;
         $scope.usuarioEnviar.id_local = queActualizar;
         servicioRetornoUsuarios.ABM_Usuario($scope.usuarioEnviar, "Modificar").then(function(respuesta){
              $scope.refrescarEstado();
              $state.go("usuario.perfil");
              console.info("RETORNO usuario: ",respuesta.data);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });
         
      }
    }

    $scope.refrescarEstado=function(){

      $scope.usuarioElegido.estado = $scope.usuarioEnviar.estado;
      if($scope.usuarioEnviar.estado == "activo")
        $("#estadoUserTabla").attr("style","color:green");
      else
        $("#estadoUserTabla").attr("style","color:red");
    }
});