angular.module('ABMangularAPI.controladorLocalOpciones', [])  
  app.controller('controlLocalOpciones', function($scope, $http, $state, $auth, $stateParams, servicioRetornoOfertas, servicioRetornoProductos) {

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

        $scope.EleccionProducto = function(productoElegido){

          console.info("Producto seleccionado: ", productoElegido);
          var id = '#' + productoElegido;
            if($(id).prop('checked'))
              $scope.adquirir.productos.push(productoElegido);  
            else
              $scope.adquirir.productos.splice($scope.adquirir.productos.indexOf(productoElegido),1);

          console.info("Productos a adquirir: ", $scope.adquirir.productos);
        }

        $scope.EleccionOferta = function(ofertaElegida){

          console.info("Oferta seleccionada: ", ofertaElegida);
          var id = '#' + ofertaElegida;
            if($(id).prop('checked'))
              $scope.adquirir.ofertas.push(ofertaElegida);  
            else
              $scope.adquirir.ofertas.splice($scope.adquirir.ofertas.indexOf(ofertaElegida),1);

          console.info("Ofertas a adquirir: ", $scope.adquirir.ofertas);
        }

          //FOTOS EN MODAL (PRODUCTOS)
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

        $scope.cerrarSesion = function(){
            $auth.logout();
            $state.go("inicio");
        }

    }//FIN DE LA CONDICION ELSE
});