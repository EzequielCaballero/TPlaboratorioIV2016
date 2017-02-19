 angular.module('ABMangularAPI.controladorClientePerfil', []) 
  app.controller('controlClientePerfil', function($scope, $http, $state, $auth, $stateParams, 
    servicioRetornoUsuarios, servicioRetornoCompras, servicioRetornoReservas, servicioRetornoOperaciones) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
        $scope.traer = $sesion.usuario;
    }

    //DEFINIR LOADING
    $scope.verPerfil = false;
    $scope.verOperaciones = false;
    $scope.loadingData = true;
    $scope.DatoRegistro="Mis datos";

    $scope.botonActualizar = true;
    console.info("Parametro: ", $stateParams);
    
    //************************TRAER DATOS INICIALES************************//
    
    //TRAER DATO DE USUARIO
    $scope.usuarioElegido = {};
    servicioRetornoUsuarios.traerCiertosUsuarios($scope.traer).then(function(respuesta){
      $scope.usuarioElegido = respuesta.data;
      if($scope.usuarioElegido.estado == "activo")
        $("#estadoUserTabla").attr("style","color:green");
      else
        $("#estadoUserTabla").attr("style","color:red");

      //DESACTIVAR LOADING
      $scope.verPerfil = true;
      $scope.loadingData = false;
      //DATOS A ENVIAR
      console.info("Usuario traido: ", $scope.usuarioElegido);
    });

    //TRAER OPERACIONES TOTALES
    servicioRetornoOperaciones.traerTodo().then(function(respuesta){
        $scope.lista_operaciones_totales = respuesta.data;
        $scope.operaciones_filtradas = [];
        for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
            if($scope.lista_operaciones_totales[i].id_usuario == $sesion.usuario)
            {  
               $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
            }
        }
        console.info("Operaciones filtradas: ", $scope.operaciones_filtradas);
      },function errorCallback(response) {
                console.log("FALLO RETORNO OPERACIONES! ", response);
    });

    //************************DEFINICION DE VISTAS************************//
    $scope.opcion_miPerfil = true;

    $scope.consultar = function(criterio){

      switch(criterio)
      {
         case "miPerfil":
         $scope.DatoRegistro="Mis datos";
         $scope.verPerfil = true;
         $scope.verOperaciones = false;
         //BOTONES
         $scope.opcion_miPerfil = true;
         $scope.opcion_misCompras = false;
         $scope.opcion_misReservas = false;
         break;

         case "misCompras":
         $scope.DatoRegistro="Mis compras";

         $scope.operaciones_elegida = [];
         for (var i = 0; i < $scope.operaciones_filtradas.length; i++) {
           if($scope.operaciones_filtradas[i].tipo_operacion == "compra")
            $scope.operaciones_elegida.push($scope.operaciones_filtradas[i]);
         }
         console.info("Operacion elegida: ", $scope.operaciones_elegida);

         $scope.verPerfil = false;
         $scope.verOperaciones = true;
         //BOTONES
         $scope.opcion_miPerfil = false;
         $scope.opcion_misCompras = true;
         $scope.opcion_misReservas = false;
         break;
         
         case "misReservas":
         $scope.DatoRegistro="Mis Reservas";

         $scope.operaciones_elegida = [];
         for (var i = 0; i < $scope.operaciones_filtradas.length; i++) {
           if($scope.operaciones_filtradas[i].tipo_operacion == "reserva")
            $scope.operaciones_elegida.push($scope.operaciones_filtradas[i]);
         }

         $scope.verPerfil = false;
         $scope.verOperaciones = true;
         //BOTONES
         $scope.opcion_miPerfil = false;
         $scope.opcion_misCompras = false;
         $scope.opcion_misReservas = true;
         break;
      }

    }

    //MOSTRAR DETALLES DE LA OPERACION
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

    $scope.cerrarSesion = function(){
        $auth.logout();
        $state.go("inicio");
    }


});