angular.module('ABMangularAPI.controladorLocalOpciones', [])  
  app.controller('controlLocalOpciones', function($scope, $http, $state, $auth, $stateParams, servicioRetornoOfertas, servicioRetornoProductos, servicioRetornoOperaciones, servicioRetornoCompras, servicioRetornoReservas) {

    $sesion = $auth.getPayload();//SE ASUME HAY SESION ACTIVA
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
      $state.go("inicio");

    if($stateParams.obj == null)
    {
      if($sesion.perfil == "Cliente")
        $state.go("cliente.inicio");
      else
        $state.go("inicio");
    }
    else
    {
        $scope.local = $stateParams.obj;
        console.info("Parametro datos: ", $stateParams);
        $scope.direccionLocal = $scope.local.direccion;
        console.info("Local traido: ", $scope.local);

        $scope.disabledProductos = false;
        $scope.disabledOfertas = false;

        //TRAER OFERTAS
        servicioRetornoOfertas.traerCiertasOfertas($scope.local.id_local).then(function(respuesta){
          $scope.lista_ofertas = respuesta.data;
          console.info("Opciones de ofertas:", $scope.lista_ofertas);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
        });

        //TRAER PRODUCTOS
        servicioRetornoProductos.traerTodo().then(function(respuesta){
          $scope.lista_productos = respuesta.data;
          console.info("Opciones de productos:", $scope.lista_productos);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
        });

        //TRAER PRODUCTOS (según oferta)
        $scope.verProductosDeOferta = function(oferta){

          servicioRetornoProductos.traerCiertosProductos(oferta).then(function(respuesta){
          $scope.lista_productos_oferta = respuesta.data;
          console.info("Productos asociados a oferta:", respuesta.data);

          $scope.imagenProductos($scope.lista_productos_oferta, 'oferta');
          $scope.verSoloProductos = false;
          $scope.verProductosPorOferta = true;
          // $("#verProductos").on("shown.bs.modal", function(e) {
          // });

          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });

        }

        //DEFINO ARRAY GLOBAL DE SELECCION FUTURA DE CLIENTE
        $scope.adquirir = {};
        $scope.adquirir.productos = [];
        $scope.adquirir.ofertas = [];
        $scope.adquirir.precio_total= 0;
        $scope.habilitarOperacion = false;
        $scope.bloquearCompra = true;
        $scope.bloquearReserva = true;

        //DEFINIR VISIBILIDAD DE CONFIRMAR OPERACION
        $scope.operacionHabilitada = function(){

          if($scope.adquirir.productos.length != 0 || $scope.adquirir.ofertas.length != 0)
          {
            $scope.habilitarOperacion = true;
            $scope.bloquearCompra = false;
            $scope.bloquearReserva = false;
          }
          else
          {
            $scope.habilitarOperacion = false;
            $scope.bloquearCompra = true;
            $scope.bloquearReserva = true;
          }
        }

        //**********************************************OPCIONES DE COMPRA/RESERVA**********************************************//
        $scope.EleccionProducto = function(productoElegido){

          console.info("Producto seleccionado: ", productoElegido);
          var id = '#' + productoElegido;

            for (var i = 0; i < $scope.lista_productos.length; i++) {
                if($scope.lista_productos[i].id_producto == productoElegido)
                  var indice = i;
            }

          if($(id).prop('checked'))
          {
            $scope.adquirir.productos.push($scope.lista_productos[indice]);
            $scope.adquirir.precio_total+= $scope.lista_productos[indice].precio;
          }
          else
          {
            $scope.adquirir.productos.splice($scope.adquirir.productos.indexOf($scope.lista_productos[indice]),1);
            $scope.adquirir.precio_total-= $scope.lista_productos[indice].precio;
          }

          $scope.operacionHabilitada();
          console.info("Productos a adquirir: ", $scope.adquirir.productos);
        }

        $scope.EleccionOferta = function(ofertaElegida){

          console.info("Oferta seleccionada: ", ofertaElegida);
          var id = '#' + ofertaElegida;

            for (var i = 0; i < $scope.lista_ofertas.length; i++) {
                if($scope.lista_ofertas[i].id_oferta == ofertaElegida)
                  var indice = i;
            }

          if($(id).prop('checked'))
          {
            $scope.adquirir.ofertas.push($scope.lista_ofertas[indice]);
            $scope.adquirir.precio_total+=$scope.lista_ofertas[indice].precio;
          }
          else
          {
            $scope.adquirir.ofertas.splice($scope.adquirir.ofertas.indexOf($scope.lista_ofertas[indice]),1);
            $scope.adquirir.precio_total-=$scope.lista_ofertas[indice].precio;
          }

          $scope.operacionHabilitada();
          console.info("Ofertas a adquirir: ", $scope.adquirir.ofertas.length);
        }

        //**********************************************CONFIRMAR OPERACION (COMPRA o RESERVA)**********************************************//
        
        //EFECTUAR COMPRA
        $scope.Comprar = function(){
          
          $scope.bloquearCompra = true;
          $scope.bloquearReserva = true;
          $scope.compra = {};
          var cantidad_productos = $scope.adquirir.productos.length;
          for (var i = 0; i < $scope.adquirir.ofertas.length; i++) {
             
             cantidad_productos += $scope.adquirir.ofertas[i].cant_productos;
          } 
          console.info("cantidad productos comprados: ", cantidad_productos);
          
          $scope.compra.cantidad_prod = cantidad_productos;
          $scope.compra.precio_final = $scope.adquirir.precio_total;
          $scope.compra.ofertasAsociadas = $scope.adquirir.ofertas;
          $scope.compra.productosAsociados = $scope.adquirir.productos;

          servicioRetornoCompras.ABM_Compra($scope.compra, "Agregar").then(function(respuesta){
            console.info("Nueva fila: ", respuesta.data);
            $scope.agregarOperacion("compra");
          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });
        }

        //CAJA CONFIRMAR OPERACION (en proceso...)
        $scope.cajaConfirmarOperacion = false;
        $scope.confirmarOperacion = function(){

        }

        //CAJA ELEGIR FECHA DE RESERVA
        $scope.alertaFechaErronea = false;
        var hoy = new Date();
        var fechaActual = hoy.getFullYear() + "-" + (hoy.getMonth() +1) + "-" + hoy.getDate();
        $scope.fechaPorDefecto = fechaActual;

        $scope.resetearFecha = function(){
          $scope.fechaPorDefecto = fechaActual;
        }

        //ELEGIR FECHA DE LA RESERVA
        $scope.elegirFechaReserva = function(){
          $scope.cajaIrEncuesta = false;
          $scope.cajaFechaReserva = true;
          $scope.cajaOperacionFinalizada = false;
          $scope.fechaInvalida = true;
          $scope.tituloOperacion = "Seleccione una fecha de reserva";
          $('#caminoAencuesta').modal({backdrop: 'static', keyboard: false});
        }

        //VALIDAR FECHA DE RESERVA
        $scope.validarFechaReserva = function(){

          console.info("Fecha actual", fechaActual);
          console.info("Fecha cargada: ", $('#datetimepicker').val());
          if($('#datetimepicker').val() != fechaActual)
          {
            var fechaPresente = moment(new Date(fechaActual));
            var fechaElegida = moment(new Date($('#datetimepicker').val()));
            var fechaAvalidar = fechaElegida.diff(fechaPresente, 'days') + 1;
            console.info("Diferencia de días: ", fechaAvalidar);
            if(fechaAvalidar >= 2 && fechaAvalidar <= 5)
            {
              $scope.fechaFinal = $('#datetimepicker').val();
              $scope.alertaFechaErronea = false;
              $scope.fechaInvalida = false;
            }
            else
            {
              $scope.alertaFechaErronea = true;
              $scope.fechaInvalida = true;
            }
          }
          else
          {
            $scope.alertaFechaErronea = true;
            $scope.fechaInvalida = true;
          }
        }

        //EFECTUAR RESERVA
        $scope.Reservar = function(){

            $scope.bloquearCompra = true;
            $scope.bloquearReserva = true;
            $scope.reserva = {};
            var cantidad_productos = $scope.adquirir.productos.length;
            for (var i = 0; i < $scope.adquirir.ofertas.length; i++) {
               cantidad_productos += $scope.adquirir.ofertas[i].cant_productos;
             } 
            console.info("cantidad productos reservados: ", cantidad_productos);

            $scope.reserva.fecha_entrega = $scope.fechaFinal;
            $scope.reserva.cantidad_prod = cantidad_productos;
            $scope.reserva.precio_final = $scope.adquirir.precio_total;
            $scope.reserva.ofertasAsociadas = $scope.adquirir.ofertas;
            $scope.reserva.productosAsociados = $scope.adquirir.productos;

            servicioRetornoReservas.ABM_Reserva($scope.reserva, "Agregar").then(function(respuesta){
              console.info("Nueva fila: ", respuesta.data);
              $scope.agregarOperacion("reserva");
            },function errorCallback(response) {
                  console.log("FALLO! ", response);
            });
        }

        //FIN DE COMPRA/RESERVA (se agrega operación)
        $scope.agregarOperacion = function(tipo){

          $scope.operacion = {};
          $scope.operacion.tipo_operacion = tipo;
          var hoy = new Date();
          $scope.operacion.fecha = hoy.getFullYear() + "-" + (hoy.getMonth() +1) + "-" + hoy.getDate();
          $scope.operacion.id_local = $scope.local.id_local;
          $scope.operacion.id_usuario = $sesion.usuario;
          $scope.operacion.total = $scope.adquirir.precio_total;
          console.info("OPERACION: ", $scope.operacion);

          servicioRetornoOperaciones.ABM_Operacion($scope.operacion, "Agregar").then(function(respuesta){
            
            console.info("Nueva fila: ", respuesta.data);
            $scope.operacion.id_operacion = respuesta.data;
            
            $scope.cajaIrEncuesta = true;
            $scope.cajaFechaReserva = false;
            $scope.tituloOperacion = "Operacion finalizada con éxito";

            if($sesion.perfil == "Cliente")
            {
              $scope.cajaIrEncuesta = true;
              $scope.cajaFechaReserva = false;
              $scope.tituloOperacion = "Operacion finalizada con éxito";
              $('#caminoAencuesta').modal({backdrop: 'static', keyboard: false});
            }
            else
            {
              $scope.cajaIrEncuesta = false;
              $scope.cajaFechaReserva = false;
              $scope.cajaOperacionFinalizada = true;
              $scope.tituloOperacion = "Operacion finalizada";
              $('#caminoAencuesta').modal({backdrop: 'static', keyboard: false});
            }

          
          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });
        }

        //REDIRECCIONAR
          $scope.dondeIr = function(lugar){

              switch(lugar)
              {
                case "encuesta":
                  setTimeout(function(){ $state.go('cliente.encuesta', {id_operacion:$scope.operacion.id_operacion}); }, 300);
                break;
                case "inicio":
                  if($sesion.perfil == "Cliente")
                    setTimeout(function(){ $state.go('cliente.inicio'); }, 300);
                  else
                    setTimeout(function(){ $state.go('inicio'); }, 300);
                break;
              }
          }

          //**********************************************FOTOS EN MODAL (PRODUCTOS)**********************************************//

          $scope.imagenProductos = function(producto, criterio){
        
          var slideIndex = 1;

          function mostrarFoto(n) {
            var i;
            var x = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("demo");
            if (n > x.length) {slideIndex = 1}    
            if (n < 1) {slideIndex = x.length}
            for (i = 0; i < x.length; i++) {
               x[i].style.display = "none";  
            }
            x[slideIndex-1].style.display = "block";

            var productName = document.getElementsByClassName("productoEnvista");
            if(productName.length != 0)
            { 
              for (var i = 0; i < productName.length; i++) {
                productName[i].style.backgroundColor = "white";
              }
              productName[slideIndex-1].style.backgroundColor = "#EABF64";
            }  
          }

          $scope.moverFoto = function(n) {
            mostrarFoto(slideIndex += n);
          }

          $scope.elegirFoto = function(n) {
            mostrarFoto(slideIndex = n);
          }

          if(criterio=='solo')
          {
              $scope.verSoloProductos = true;
              $scope.verProductosPorOferta = false;
              $scope.tituloGaleria = producto.nombre;
              console.info("Titulo", $scope.tituloGaleria);
              $scope.fotoProducto_1 = producto.foto1;
              $scope.fotoProducto_2 = producto.foto2;
              $scope.fotoProducto_3 = producto.foto3;
              console.info("Producto info: ", producto);
          }
          else
          {
            $scope.tituloGaleria = "Productos asociados a la oferta";
            $('#verProductos').modal('show');
          }

          setTimeout(function(){ mostrarFoto(slideIndex); }, 300);

        }//FIN de función imagenProductos

        //OPCIONES DE MENU
        $scope.visualizar = function(accion){
          switch(accion)
          {
            case "Productos":
              $scope.verProductos = true;
              $scope.verOfertas = false;
              $scope.disabledProductos = true;
              $scope.disabledOfertas = false;
              break;
            case "Ofertas":
              $scope.verProductos = false;
              $scope.verOfertas = true;
              $scope.disabledProductos = false;
              $scope.disabledOfertas = true;
              break;
          }
        }

    }//FIN DE LA CONDICION ELSE
});