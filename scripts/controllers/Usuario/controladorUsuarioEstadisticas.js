angular.module('ABMangularAPI.controladorUsuarioEstadisticas', [])  
  app.controller('controlUsuarioEstadisticas', function($scope, $http, $state, $auth, servicioRetornoUsuarios, servicioRetornoLocales, servicioRetornoOperaciones, 
    servicioRetornoProductos, servicioRetornoOfertas, servicioRetornoCompras, servicioRetornoReservas, servicioRetornoEncuestas, servicioRetornoRegistroSesiones) {

    //SI estoy en este menú quiere decir que ya hay una sesión activa, resta saber que usuario esta logueado.
    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
    {
       $state.go("inicio");
    }
    else
    {
        $sesion = $auth.getPayload();
    }

    
    //VER RESULTADOS DE CONSULTA
    $scope.verConsultaOperaciones = false;
    $scope.verConsultaProductoMasVendido = false;
    $scope.verConsultaRegistroSesiones = false;
    $scope.verConsultaEncuestaEstadisticas = false;

    /************************************TRAER DATOS INICIALES************************************/

    //FIJAR FECHA ACTUAL
    var hoy = new Date();
    var fechaActual = hoy.getFullYear() + "-" + (hoy.getMonth() +1) + "-" + hoy.getDate();
    $scope.fechaPorDefecto = fechaActual;

    //TRAER OPERACIONES TOTALES
    servicioRetornoOperaciones.traerTodo().then(function(respuesta){
        $scope.lista_operaciones_totales = respuesta.data;
        //console.info("Lista operaciones: ", $scope.lista_operaciones_totales);

      },function errorCallback(response) {
                console.log("FALLO RETORNO OPERACIONES! ", response);
    });

    //TRAER ENCUESTAS TOTALES
    servicioRetornoEncuestas.traerTodo().then(function(respuesta){
        $scope.lista_encuestas_totales = respuesta.data;
        console.info("Lista encuestas: ", $scope.lista_encuestas_totales);

      },function errorCallback(response) {
                console.log("FALLO RETORNO ENCUESTAS! ", response);
    });

    //TRAER REGISTROS TOTALES
    servicioRetornoRegistroSesiones.traerTodo().then(function(respuesta){
        $scope.lista_registros_totales = respuesta.data;
        console.info("Lista Registros: ", respuesta.data);

      },function errorCallback(response) {
                console.log("FALLO RETORNO REGISTROS! ", response);
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

      },function errorCallback(response) {
            console.log("FALLO! ", response);
    });
    $scope.locales = locales;

    //TRAER USUARIOS TOTALES
    servicioRetornoUsuarios.traerCiertosUsuarios($sesion).then(function(respuesta){
        $scope.lista_usuarios_totales = respuesta.data;
        console.info("Lista usuarios: ", $scope.lista_usuarios_totales);
    });

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
          $scope.opcion_ventasMayores = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = true;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarVentasMayores = false;
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
          $scope.opcion_ventasMayores = false;
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
          $scope.opcion_ventasMayores = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = true;
          $scope.modalSeleccionarVentasMayores = false;
          $scope.modalSeleccionarUnicaFecha = false;
          $scope.modalSeleccionarRespuestaEncuesta = false;
          $scope.tituloModalOpciones = "Producto de mayor venta";
          $('#opcionesConsulta').modal({backdrop: 'static', keyboard: false});
          break;
        
        case "ventas_mayores":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_ventasMayores = true;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarVentasMayores = true;
          $scope.modalSeleccionarUnicaFecha = false;
          $scope.modalSeleccionarRespuestaEncuesta = false;
          $scope.tituloModalOpciones = "Ventas mayores";
          $('#opcionesConsulta').modal({backdrop: 'static', keyboard: false});
          break;

        case "ventas_dia":
          //MANEJADOR
          $scope.opcion_ventasLocal = false;
          $scope.opcion_ventasEmpleado = false;
          $scope.opcion_ventasEntreFechas = false;
          $scope.opcion_ventasMayores = false;
          $scope.opcion_importePordia = true;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = false;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarVentasMayores = false;
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
          $scope.opcion_ventasMayores = false;
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
          $scope.opcion_ventasMayores = false;
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
          $scope.opcion_ventasMayores = false;
          $scope.opcion_importePordia = false;
          $scope.opcion_clienteOperaciones = false;
          $scope.opcion_registroSesiones = false;
          $scope.opcion_encuestaEstadistica = true;

          //OPCION MODAL
          $scope.modalSeleccionarLocal = false;
          $scope.modalSeleccionarDosFechas = false;
          $scope.modalSeleccionarVentasMayores = false;
          $scope.modalSeleccionarUnicaFecha = false;
          $scope.modalSeleccionarRespuestaEncuesta = true;
          $scope.tituloModalOpciones = "Estadísticas según encuestas";
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
          //console.info("Operaciones coincidentes: ",$scope.operaciones_filtradas);
          $scope.tipoOperacion = "- Ventas por local";
          $scope.mostrarTabla("tabla_operaciones");
          $scope.desbloquearBoton("opcion_ventasLocal");
          break;

          case "venta_empleado":
          $scope.empleados = [];
          $scope.operaciones_filtradas = [];
          console.info("operaciones totales: ", $scope.lista_operaciones_totales);
          for (var i = 0; i < $scope.lista_usuarios_totales.length; i++) {
            if($scope.lista_usuarios_totales[i].tipo_user == "empleado")
              $scope.empleados.push($scope.lista_usuarios_totales[i].id_usuario);  
          }
          //console.info("Empleados: ", $scope.empleados);
          for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
            for (var j = 0; j < $scope.empleados.length; j++) {
                if($scope.lista_operaciones_totales[i].id_usuario == $scope.empleados[j])
                {  
                   $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
                }
            }
          }
          //console.info("Operaciones coincidentes: ",$scope.operaciones_filtradas);
          $scope.tipoOperacion = "- Ventas por Empleado";
          $scope.mostrarTabla("tabla_operaciones");
          break;

          case "venta_entre_fechas":
          $scope.operaciones_filtradas = [];
          var fecha_1 = Date.parse($("#fecha_uno").val());
          var fecha_2 = Date.parse($("#fecha_dos").val());
            if(fecha_1 < fecha_2)
            {
              fecha_menor = fecha_1
              fecha_mayor = fecha_2
            }
            else
            {
              fecha_menor = fecha_2
              fecha_mayor = fecha_1
            }

          for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
            fecha_operacion = Date.parse($scope.lista_operaciones_totales[i].fecha);

            if(fecha_operacion >= fecha_menor && fecha_operacion <= fecha_mayor)
            {  
               $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
            }
          }

          $scope.tipoOperacion = "- Ventas entre fechas";
          $scope.mostrarTabla("tabla_operaciones");
          $scope.desbloquearBoton("opcion_ventasEntreFechas");
          break;

          case "producto_mayorVenta":
          servicioRetornoProductos.traerCiertosProductos("masVendido").then(function(respuesta){
              $scope.respuesta = respuesta.data;
              $scope.mayorVentas = {};
              $scope.mayorVentas.id = $scope.respuesta[0][0];
              $scope.mayorVentas.nombre = $scope.respuesta[0][1];
              $scope.mayorVentas.precio = $scope.respuesta[0][2];
              $scope.mayorVentas.ventas = $scope.respuesta[0][3];
              console.info("Producto mas vendido: ", $scope.respuesta);
          });

          $scope.tipoOperacion = "- producto más vendido";
          $scope.mostrarTabla("mayor_venta");
          $scope.desbloquearBoton("opcion_ventasMayores");
          break;

          case "oferta_mayorVenta":
          servicioRetornoOfertas.traerCiertasOfertas("masVendida").then(function(respuesta){
              $scope.respuesta = respuesta.data;
              $scope.mayorVentas = {};
              $scope.mayorVentas.id = $scope.respuesta[0][0];
              $scope.mayorVentas.nombre = $scope.respuesta[0][1];
              $scope.mayorVentas.precio = $scope.respuesta[0][2];
              $scope.mayorVentas.ventas = $scope.respuesta[0][3];
              console.info("Oferta mas vendida: ", $scope.respuesta);
          });
          $scope.tipoOperacion = "- oferta más vendida";
          $scope.mostrarTabla("mayor_venta");
          $scope.desbloquearBoton("opcion_ventasMayores");
          break;

          case "venta_por_fecha":
          var fecha_consulta = $("#fecha_importeDelDia").val();
          $scope.operaciones_filtradas = [];
          for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
            if($scope.lista_operaciones_totales[i].fecha == fecha_consulta)
            {  
               $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
            }
          }
          $scope.tipoOperacion = "- Ventas del día";
          $scope.mostrarTabla("tabla_operaciones");
          $scope.desbloquearBoton("opcion_importePordia");
          break;

          case "operaciones_cliente":
          $scope.clientes = [];
          $scope.operaciones_filtradas = [];
          for (var i = 0; i < $scope.lista_usuarios_totales.length; i++) {
            if($scope.lista_usuarios_totales[i].tipo_user == "cliente")
              $scope.clientes.push($scope.lista_usuarios_totales[i].id_usuario);  
          }
          //console.info("clientes: ", $scope.clientes);
          for (var i = 0; i < $scope.lista_operaciones_totales.length; i++) {
            for (var j = 0; j < $scope.clientes.length; j++) {
                if($scope.lista_operaciones_totales[i].id_usuario == $scope.clientes[j])
                {  
                   $scope.operaciones_filtradas.push($scope.lista_operaciones_totales[i]); 
                }
            }
          }
          $scope.tipoOperacion = "- compra/reserva Cliente";
          $scope.mostrarTabla("tabla_operaciones");
          break;

          case "registro_sesiones":
          $scope.mostrarTabla("tabla_registros");
          break;
      }

    }

    //GENERAR GRAFICO DE ENCUESTA
    $scope.estadistica = function(pregunta){

      $scope.datos_encuesta = [];
      switch(pregunta)
      {
          //*******************PREGUNTA N°1
          case "pregunta_1":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          var opcion_5 = 0;
          var opcion_6 = 0;
          var opcion_7 = 0;
          var opcion_8 = 0;
          var opcion_9 = 0;
          var opcion_10 = 0;
          var opcion_11 = 0;
          $scope.etiquetasGrafico = ["Muzzarella","Anchoas","Napolitana","Capresse","Calabresa","Americana","Roquefort","Fugazza","Fugazzeta","Provolone","Otra"];
          
          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_1)
            {
              case "Muzzarella": opcion_1++;  break;
              case "Anchoas":    opcion_2++;  break;
              case "Napolitana": opcion_3++;  break;
              case "Capresse":   opcion_4++;  break;
              case "Calabresa":  opcion_5++;  break;
              case "Americana":  opcion_6++;  break;
              case "Roquefort":  opcion_7++;  break;
              case "Fugazza":    opcion_8++;  break;
              case "Fugazzeta":  opcion_9++;  break;
              case "Provolone":  opcion_10++; break;
              default:           opcion_11++; break; 
            }
          }

          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4, opcion_5, opcion_6, opcion_7, opcion_8, opcion_9, opcion_10, opcion_11];
          break;

          //*******************PREGUNTA N°2
          case "pregunta_2":
          var opcion_1 = 0;
          var opcion_2 = 0;
          $scope.etiquetasGrafico = ["Al molde", "A la piedra"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            if($scope.lista_encuestas_totales[i].pregunta_2 == "al molde")
              opcion_1++;
            else
              opcion_2++;
          }
          $scope.datos_encuesta = [opcion_1, opcion_2];
          break;

          //*******************PREGUNTA N°3
          case "pregunta_3":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          var opcion_5 = 0;
          var opcion_6 = 0;
          $scope.etiquetasGrafico = ["Salsa","Oregano","Queso","Masa","Fiambre","Otro"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_3)
            {
              case "salsa":    opcion_1++;  break;
              case "oregano":  opcion_2++;  break;
              case "queso":    opcion_3++;  break;
              case "masa":     opcion_4++;  break;
              case "fiambre":  opcion_5++;  break;
              default:         opcion_6++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4, opcion_5, opcion_6];
          break;

          //*******************PREGUNTA N°4
          case "pregunta_4":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Frecuente","Poco frecuente","Nada frecuente"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_4)
            {
              case "2-3 por semana":  case "1 vez por semana": opcion_1++;  break;
              case "1-2 por mes":  opcion_2++;  break;
              case "3-6 meses":   case "nada frencuente": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°5
          case "pregunta_5":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Buena", "Mala", "Intermedia"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_5)
            {
              case "buena":      opcion_1++;  break;
              case "mala":       opcion_2++;  break;
              case "intermedia": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°6
          case "pregunta_6":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          $scope.etiquetasGrafico = ["Precio","Calidad","Sabor","Otro"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_6)
            {
              case "precio":  opcion_1++;  break;
              case "calidad": opcion_2++;  break;
              case "sabor":   opcion_3++;  break;
              default:        opcion_4++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4];
          break;

          //*******************PREGUNTA N°7
          case "pregunta_7":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          $scope.etiquetasGrafico = ["Si","No","Tal vez","Nunca"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_7)
            {
              case "si":        opcion_1++;  break;
              case "no":        opcion_2++;  break;
              case "tal vez":   opcion_3++;  break;
              case "nunca":     opcion_4++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4];
          break;

          //*******************PREGUNTA N°8
          case "pregunta_8":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Si","No","Ni idea"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_8)
            {
              case "si":      opcion_1++;  break;
              case "no":      opcion_2++;  break;
              case "ni idea": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°9
          case "pregunta_9":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          $scope.etiquetasGrafico = ["$50-$100","$100-$150","$150-$300","Gratis"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_9)
            {
              case "de 50 a 100 $":  opcion_1++;  break;
              case "de 100 a 150 $": opcion_2++;  break;
              case "de 150 a 300 $": opcion_3++;  break;
              default:               opcion_4++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4];
          break;

          //*******************PREGUNTA N°10
          case "pregunta_10":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Si","No","No se"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_10)
            {
              case "si":    opcion_1++;  break;
              case "no":    opcion_2++;  break;
              case "no se": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°11
          case "pregunta_11":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          var opcion_5 = 0;
          $scope.etiquetasGrafico = ["Muy Alto", "Alto","Medio","Bajo","Muy Bajo"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_11)
            {
              case 10: case 9:  opcion_1++;  break;
              case 8:  case 7:  opcion_2++;  break;
              case 6:  case 5:  opcion_3++;  break;
              case 4:  case 3:  opcion_4++;  break;
              case 2:  case 1:  opcion_5++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4, opcion_4];
          break;

          //*******************PREGUNTA N°12
          case "pregunta_12":
          var opcion_1 = 0;
          var opcion_2 = 0;
          $scope.etiquetasGrafico = ["SI", "NO"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            if($scope.lista_encuestas_totales[i].pregunta_12 == "si")
              opcion_1++;
            else
              opcion_2++;
          }
          $scope.datos_encuesta = [opcion_1, opcion_2];
          break;

          //*******************PREGUNTA N°13
          case "pregunta_13":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          var opcion_5 = 0;
          $scope.etiquetasGrafico = ["Amigo","Televisión","Radio","Diario", "Exámen"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_13)
            {
              case "amigo":      opcion_1++;  break;
              case "television": opcion_2++;  break;
              case "radio":      opcion_3++;  break;
              case "diario":     opcion_4++;  break;
              case "te corrijo": opcion_5++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4, opcion_5];
          break;

          //*******************PREGUNTA N°14
          case "pregunta_14":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Si","No","Me da igual"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_14)
            {
              case "si":          opcion_1++;  break;
              case "no":          opcion_2++;  break;
              case "me da igual": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°15
          case "pregunta_15":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Si","No","Irrelevante"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_15)
            {
              case "si":          opcion_1++;  break;
              case "no":          opcion_2++;  break;
              case "irrelevante": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°16
          case "pregunta_16":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          var opcion_5 = 0;
          $scope.etiquetasGrafico = ["10 min","30 min","1 hora","2 horas", "Lo que de"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_16)
            {
              case "10 min":    opcion_1++;  break;
              case "30 min":    opcion_2++;  break;
              case "1 hora":    opcion_3++;  break;
              case "2 horas":   opcion_4++;  break;
              case "Lo que de": opcion_5++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4, opcion_5];
          break;

          //*******************PREGUNTA N°18
          case "pregunta_18":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Si","No","No lo recuerdo"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_18)
            {
              case "si":          opcion_1++;  break;
              case "no":          opcion_2++;  break;
              case "no lo recuerdo": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;

          //*******************PREGUNTA N°19
          case "pregunta_19":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          var opcion_4 = 0;
          var opcion_5 = 0;
          $scope.etiquetasGrafico = ["Estética","Funcionalidad","Información", "Variedad", "Otra causa"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_19)
            {
              case "estetica":    opcion_1++;  break;
              case "funcional":   opcion_2++;  break;
              case "informacion": opcion_3++;  break;
              case "variedad":    opcion_4++;  break;
              default:            opcion_5++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3, opcion_4, opcion_5];
          break;

          //*******************PREGUNTA N°20
          case "pregunta_20":
          var opcion_1 = 0;
          var opcion_2 = 0;
          var opcion_3 = 0;
          $scope.etiquetasGrafico = ["Local","Página","No lo se"];

          for (var i = 0; i < $scope.lista_encuestas_totales.length; i++) {
            switch($scope.lista_encuestas_totales[i].pregunta_20)
            {
              case "local":    opcion_1++;  break;
              case "pagina":   opcion_2++;  break;
              case "no lo se": opcion_3++;  break;
            }
          }
          $scope.datos_encuesta = [opcion_1, opcion_2, opcion_3];
          break;
      }

      $scope.mostrarTabla("estadistica_encuestas");
      $scope.opcion_encuestaEstadistica = false;
    }

    //MOSTRAR LA TABLA CON LA CONSULTA FILTRADA
    $scope.mostrarTabla = function(mostrar){
      switch(mostrar)
      {
         case "tabla_operaciones":
         //$("#tablaOperaciones").load("usuario.estadisticas");
         $scope.verConsultaOperaciones = true;
         $scope.verConsultaProductoMasVendido = false;
         $scope.verConsultaRegistroSesiones = false;
         $scope.verConsultaEncuestaEstadisticas = false;
         break;

         case "mayor_venta":
         $scope.verConsultaOperaciones = false;
         $scope.verConsultaProductoMasVendido = true;
         $scope.verConsultaRegistroSesiones = false;
         $scope.verConsultaEncuestaEstadisticas = false;
         break;

         case "tabla_registros":
         $scope.verConsultaOperaciones = false;
         $scope.verConsultaProductoMasVendido = false;
         $scope.verConsultaRegistroSesiones = true;
         $scope.verConsultaEncuestaEstadisticas = false;
         break;

         case "estadistica_encuestas":
         $scope.verConsultaOperaciones = false;
         $scope.verConsultaProductoMasVendido = false;
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
          case "opcion_ventasMayores":
          $scope.opcion_ventasMayores = false;
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