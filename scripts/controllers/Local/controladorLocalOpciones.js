angular.module('ABMangularAPI.controladorLocalOpciones', [])  
  app.controller('controlLocalOpciones', function($scope, $http, $state, $auth, $stateParams, servicioRetornoOfertas, servicioRetornoProductos, servicioRetornoOperaciones, servicioRetornoCompras, servicioRetornoReservas) {

    $sesion = $auth.getPayload();//SE ASUME HAY SESION ACTIVA
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
      $state.go("inicio");

    if($stateParams.obj == null)
      $state.go("cliente.inicio");
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

        //DEFINIR VISIBILIDAD DE CONFIRMAR OPERACION
        $scope.operacionHabilitada = function(){

          if($scope.adquirir.productos.length != 0 || $scope.adquirir.ofertas.length != 0)
            $scope.habilitarOperacion = true;
          else
            $scope.habilitarOperacion = false;
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
        $scope.Comprar = function(){
          
          //alert("compra!");
          $scope.compra = {};
          var cantidad_productos = $scope.adquirir.productos.length;
          for (var i = 0; i < $scope.adquirir.ofertas.length; i++) {
             cantidad_productos += $scope.adquirir.ofertas[i].cant_productos;
           } 
          console.info("cantidad productos comprados: ", cantidad_productos);

          $scope.compra.cantidad_prod = cantidad_productos;
          $scope.compra.precio_final = $scope.adquirir.precio_total;
          $scope.compra.productosAsociados = $scope.adquirir.productos;
          $scope.compra.ofertasAsociadas = $scope.adquirir.ofertas;

          servicioRetornoCompras.ABM_Compra($scope.compra, "Agregar").then(function(respuesta){
            console.info("Fila afectada: ", respuesta.data);
            $scope.agregarOperacion("compra");
          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });
        }

        $scope.Reservar = function(){
          
          //alert("reserva!");
          $scope.reserva = {};
          var cantidad_productos = $scope.adquirir.productos.length;
          for (var i = 0; i < $scope.adquirir.ofertas.length; i++) {
             cantidad_productos += $scope.adquirir.ofertas[i].cant_productos;
           } 
          console.info("cantidad productos comprados: ", cantidad_productos);

          var hoy = new Date();
          $scope.reserva.fecha_entrega = hoy.getFullYear() + "-" + (hoy.getMonth() +1) + "-" + hoy.getDate();
          $scope.reserva.cantidad_prod = cantidad_productos;
          $scope.reserva.precio_final = $scope.adquirir.precio_total;
          $scope.reserva.productosAsociados = $scope.adquirir.productos;
          $scope.reserva.ofertasAsociadas = $scope.adquirir.ofertas;

          servicioRetornoReservas.ABM_Reserva($scope.reserva, "Agregar").then(function(respuesta){
            console.info("Fila afectada: ", respuesta.data);
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
            console.info("Fila afectada: ", respuesta.data);
          },function errorCallback(response) {
                console.log("FALLO! ", response);
          });
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