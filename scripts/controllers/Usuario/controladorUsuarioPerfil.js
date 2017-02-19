 angular.module('ABMangularAPI.controladorUsuarioPerfil', []) 
  app.controller('controlUsuarioPerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoUsuarios, 
    servicioRetornoLocales,servicioRetornoCompras, servicioRetornoReservas, servicioRetornoOperaciones) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
    }

    //DEFINIR LOADING
    $scope.verPerfil = false;
    $scope.loadingData = true;

    $scope.botonActualizar = true;
    console.info("Parametro: ", $stateParams);

    $scope.DatoRegistro="***DATOS DEL USUARIO***";
    if($sesion.perfil == "Administrador" || $sesion.perfil == "Encargado")
      $scope.botonActualizar = true;

    //DEFINIR VISTA PERFIL (PERSONAL O DE TERCERO)
    if($stateParams.id != "")
    {
      $scope.traer = $stateParams.id;
      if($stateParams.id == $sesion.usuario)
        $scope.botonActualizar = false;
    }
    else
    {
      if($usuarioLogueado != "Cliente")
      {
          $scope.traer = $sesion.usuario;
          $scope.botonActualizar = false;
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
      
      //TRAER OPERACIONES TOTALES Y FILTRAR POR CLIENTE
      $scope.botonVerOperaciones = false;
      if($scope.usuarioElegido.tipo_user == "cliente")
      {
        $scope.botonVerOperaciones = true;
        servicioRetornoOperaciones.traerTodo().then(function(respuesta){
            $scope.lista_operaciones_totales = respuesta.data;
            $scope.operaciones_filtradas = [];
            for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
                if($scope.lista_operaciones_totales[i].id_usuario == $scope.usuarioElegido.id_usuario)
                {  
                   $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
                }
            }
            console.info("Operaciones filtradas: ", $scope.operaciones_filtradas);
          },function errorCallback(response) {
                    console.log("FALLO RETORNO OPERACIONES! ", response);
        });
      }

      //DESACTIVAR LOADING
      $scope.verPerfil = true;
      $scope.loadingData = false;

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

    //OPERACIONES DEL CLIENTE
    $scope.verOperaciones = false;
    $scope.verOperacionesCliente = function(){
      $scope.verOperaciones = true;
    }

    $scope.ocultarOperaciones = function(){
      $scope.verOperaciones = false;
    }

    $scope.detalleOperacion = function(id, tipo){
      
      if(tipo == "compra")
      {
          servicioRetornoCompras.traerCiertasCompras(id).then(function(respuesta){
              $scope.operacionElegida = respuesta.data;
              console.info("Compra seleccionada: ", $scope.operacionElegida);
              $scope.tipo_Operacion = "Compra";
              $scope.idDetalle = $scope.operacionElegida.id_compra;
              $scope.productosAsociados = $scope.operacionElegida.cantidad_prod;
              $scope.precioFinal = "$"+$scope.operacionElegida.precio_final;
              $scope.esReserva = false;
              $('#verDetalleOperacion').modal("show");
            },function errorCallback(response) {
                      console.log("FALLO RETORNO OPERACIONES! ", response);
          });
      }

      if(tipo == "reserva")
      {
          servicioRetornoReservas.traerCiertasReservas(id).then(function(respuesta){
              $scope.operacionElegida = respuesta.data;
              console.info("Reserva seleccionada: ", $scope.operacionElegida);
              $scope.tipo_Operacion = "Reserva";
              $scope.idDetalle = $scope.operacionElegida.id_reserva;
              $scope.productosAsociados = $scope.operacionElegida.cantidad_prod;
              $scope.precioFinal = "$"+$scope.operacionElegida.precio_final;
              $scope.fechaEntrega = $scope.operacionElegida.fecha_entrega;
              $scope.esReserva = true;
              $('#verDetalleOperacion').modal("show");
            },function errorCallback(response) {
                      console.log("FALLO RETORNO OPERACIONES! ", response);
          });
      }
    }
});