angular.module('ABMangularAPI.controladorUsuarioEstadisticas', [])  
  app.controller('controlUsuarioEstadisticas', function($scope, $http, $state, $auth, servicioRetornoLocales, servicioRetornoOperaciones, servicioRetornoRegistroSesiones) {

    //SI estoy en este menú quiere decir que ya hay una sesión activa, resta saber que usuario esta logueado.
    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
    {
       $state.go("inicio");
    }

    
    //VER RESULTADOS DE CONSULTA
    $scope.verConsultaOperaciones = false;
    $scope.verConsultaRegistroSesiones = false;
    $scope.verConsultaEncuestaEstadisticas = false;

    // HABILITACIONES DE BOTONES DE MENU (seteo inicial)
    // $scope.opcion_ventasLocal = false;
    // $scope.opcion_ventasEmpleado = false;
    // $scope.opcion_ventasEntreFechas = false;
    // $scope.opcion_importePordia = false;
    // $scope.opcion_clienteOperaciones = false;
    // $scope.opcion_registroSesiones = false;
    // $scope.opcion_encuestaEstadistica = false;
    // //HABILITACION DE OPCIONES DE VENTANA MODAL
    // $scope.modalSeleccionarLocal = false;
    // $scope.modalSeleccionarDosFechas = false;
    // $scope.modalSeleccionarUnicaFecha = false;
    // $scope.modalSeleccionarRespuestaEncuesta = false;

    /************************************TRAER DATOS INICIALES************************************/

    //FIJAR FECHA ACTUAL
    var hoy = new Date();
    var fechaActual = hoy.getFullYear() + "-" + (hoy.getMonth() +1) + "-" + hoy.getDate();
    $scope.fechaPorDefecto = fechaActual;

    //TRAER OPERACIONES TOTALES
    servicioRetornoOperaciones.traerTodo().then(function(respuesta){
        $scope.lista_operaciones_totales = respuesta.data;
        //console.info("Operaciones totales: ", $scope.lista_operaciones_totales);

      },function errorCallback(response) {
                console.log("FALLO RETORNO OPERACIONES! ", response);
    });

    //TRAER REGISTROS TOTALES
    servicioRetornoRegistroSesiones.traerTodo().then(function(respuesta){
        $scope.lista_registros_totales = respuesta.data;
        console.info("Registros: ", respuesta.data);

      },function errorCallback(response) {
                console.log("FALLO RETORNO OPERACIONES! ", response);
    });

    //TRAER LOCALES ACTUALES
    //1- Declaración de variable "locales"  
    var locales = [];
    servicioRetornoLocales.traerTodo().then(function(respuesta){
      console.info("Locales", respuesta.data);

      //2- Rellenado de "locales" (array de objetos)
      var cantidadDatos = respuesta.data.length;
      for (var i = 0; i < cantidadDatos; i++) {
        locales[i] = {code: respuesta.data[i].id_local, name: "Local N°"+(i+1) };
      }
      console.info("Opciones de locales:", locales);

      // 3- Pasaje de Array a JSON (OPCIONAL)
      // locales = JSON.stringify(locales);
      // console.info("Locales: ", locales);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
    });
    $scope.locales = locales;
    $scope.localElegido = "";
    console.info("Locales pasaje: ", $scope.locales);

    /**************************************CONSULTAS**************************************/

    //DETERMINAR CONSULTAR
    $scope.consultar = function(consulta){
      switch(consulta)
      {
        case "ventas_local":
          //MANEJADOR
          $scope.opcion_ventasLocal = true;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = true;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarUnicaFecha = false;
          $scope.modalSeleccionarRespuestaEncuesta = false;
          $scope.tituloModalOpciones = "Ventas por local";
          $('#opcionesConsulta').modal({backdrop: 'static', keyboard: false});

          break;
        
        case "ventas_empleado":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = true;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION SIN MODAL
          $scope.filtrar("venta_empleado");
          break;  
        
        case "ventas_fechas":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = true;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = true;
          $scope.modalSeleccionarUnicaFecha = false;
          $scope.modalSeleccionarRespuestaEncuesta = false;
          $scope.tituloModalOpciones = "Producto de mayor venta";
          $('#opcionesConsulta').modal({backdrop: 'static', keyboard: false});
          break;
        
        case "ventas_dia":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_importePordia = true;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarUnicaFecha = true;
          $scope.modalSeleccionarRespuestaEncuesta = false;
          $scope.tituloModalOpciones = "Ventas generales del día";
          $('#opcionesConsulta').modal({backdrop: 'static', keyboard: false});
          break;
        
        case "compras_cliente":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = true;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION SIN MODAL
          $scope.filtrar("operaciones_cliente");
          break;
        
        case "registro_sesiones":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = true;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION SIN MODAL
          $scope.filtrar("registro_sesiones");
          break;
        
        case "encuesta_estadistica":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = true;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarUnicaFecha = false;
          $scope.modalSeleccionarRespuestaEncuesta = true;
          $scope.tituloModalOpciones = "Estadística de respuesta de encuesta";
          $('#opcionesConsulta').modal({backdrop: 'static', keyboard: false});
          break;
      }
    }
    
    //FILTRAR LISTA POR CONSULTA
    $scope.filtrar = function(criterio){

      switch(criterio)
      {
          case "venta_local":

          //Villereada
          var cadena = String($("#opcionLocal").val());
          var localy = cadena.split(":");
          var localElegido = Number(localy[1]);

          console.info("opcion elegida: ", localElegido);
          $scope.operaciones_filtradas = [];
          for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
            if($scope.lista_operaciones_totales[i].id_local == localElegido)
            {  
               $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
            }
          }
          console.info("Operaciones coincidentes: ",$scope.operaciones_filtradas);
          $scope.mostrarTabla("tabla_operaciones");
          break;

          case "venta_empleado":
          
          break;
          case "venta_entre_fechas":
          break;
          case "venta_por_fecha":
          break;
          case "operaciones_cliente":
          break;
          case "registro_sesiones":
          break;
          case "estadistica_encuesta":
          break;
      }

    }

    //MOSTRAR LA TABLA CON LA CONSULTA FILTRADA
    $scope.mostrarTabla = function(mostrar){
      switch(mostrar)
      {
         case "tabla_operaciones":
         $scope.verConsultaOperaciones = true;
         $scope.verConsultaRegistroSesiones = false;
         $scope.verConsultaEncuestaEstadisticas = false;
         break;

         case "tabla_registros":
         $scope.verConsultaOperaciones = false;
         $scope.verConsultaRegistroSesiones = true;
         $scope.verConsultaEncuestaEstadisticas = false;
         break;

         case "tabla_encuestas":
         $scope.verConsultaOperaciones = false;
         $scope.verConsultaRegistroSesiones = false;
         $scope.verConsultaEncuestaEstadisticas = true;
         break;
      }

    }

    //DESBLOQUEAR BOTONES (si se cancela opcion en modal)
    $scope.desbloquearBoton = function(boton){
      switch(boton)
      {
          case "opcion_ventasLocal":
          $scope.opcion_ventasLocal = false;
          break;
          case "opcion_ventasEntreFechas":
          $scope.fechaPorDefecto = fechaActual;
          $scope.opcion_ventasEntreFechas = false;
          break;
          case "opcion_importePordia":
          $scope.fechaPorDefecto = fechaActual;
          $scope.opcion_importePordia = false;
          break;
          case "opcion_encuestaEstadistica":
          $scope.opcion_encuestaEstadistica = false;
          break;
      }
    }

    $scope.cerrarSesion = function(){
        $auth.logout();
        $state.go("inicio");
    }

  });