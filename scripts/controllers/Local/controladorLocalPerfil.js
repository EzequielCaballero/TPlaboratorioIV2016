angular.module('ABMangularAPI.controladorLocalPerfil', [])   
  app.controller('controlLocalPerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoLocales, servicioRetornoUsuarios, 
  	servicioRetornoOfertas, servicioRetornoProductos) {

  	if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
        $sesion = $auth.getPayload();

    console.info("Parametro recibido: ", $stateParams);
    $scope.DatoRegistro = "***DATOS DEL LOCAL***";
    $scope.id_local = $stateParams.id;

    //**************************TRAER DATOS**************************//

    //TRAER LOCAL ELEGIDO
    $scope.localElegido = {};
    servicioRetornoLocales.traerCiertosLocales($scope.id_local).then(function(respuesta){

    	$scope.localElegido = respuesta.data;
    	console.info("Local traído: ", respuesta.data);
    	$scope.verPerfilLocal = true;
    	$scope.botonVerOfertas = true;

    	if($sesion.perfil == "Administrador" || $sesion.perfil == "Encargado" && $sesion.local == $scope.id_local)
    	{
    		$scope.botonActualizar = true;
    	}

	},function errorCallback(response) {
          console.log("FALLO traer locales: ", response);
    });

    //TRAER EMPLEADOS
    var empleados = [];
    servicioRetornoUsuarios.traerCiertosUsuarios("solo_Empleados").then(function(respuesta){
      console.info("empleados", respuesta.data);

      //1- Rellenado de "empleados" (array de objetos)
      var cantidadDatos = respuesta.data.length;
      for (var i = 0; i < cantidadDatos; i++) {
        var nombreEmpleado = respuesta.data[i].apellido + ", " + respuesta.data[i].nombre;
        empleados[i] = {code: respuesta.data[i].id_usuario, name: nombreEmpleado };
      }
      console.info("Opciones de empleados:", empleados);

      //2- Pasaje de Array a JSON (OPCIONAL)
      empleados = JSON.stringify(empleados);
      console.info("Empleados: ", empleados);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
    });
    //3- Asignación de opciones al Select empleados.
    $scope.usuarios = empleados;

    //TRAER OFERTAS DEL LOCAL
    servicioRetornoOfertas.traerCiertasOfertas($scope.localElegido.id_local).then(function(respuesta){
          $scope.lista_ofertas = respuesta.data;
          console.info("Opciones de ofertas:", $scope.lista_ofertas);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
        });

    //TRAER PRODUCTOS DE OFERTAS DE LOCAL
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

    $scope.Actualizar = function(queActualizar){

    	switch(queActualizar)
    	{
    		case "direccion":
    		$scope.btn_cambioDireccion = true;
    		$scope.btn_cambioEncargado = false;
    		$scope.cambiarDireccion = true;
    		$scope.cambiarEncargado = false;
    		$scope.verOfertasCliente = false;
    		break;
    		
    		case "encargado":
    		$scope.btn_cambioDireccion = false;
    		$scope.btn_cambioEncargado = true;
    		$scope.cambiarDireccion = false;
    		$scope.cambiarEncargado = true;
    		$scope.verOfertasCliente = false;
    		break;

    		case "ofertas":
    		$scope.btn_cambioDireccion = false;
    		$scope.btn_cambioEncargado = true;
    		$scope.cambiarDireccion = false;
    		$scope.cambiarEncargado = false;
    		$scope.verOfertasCliente = true;
    		break;
    	}

    }

    $scope.efectuarLosCambios = function(queCambiar){
    	
    	$scope.btn_cambioDireccion = false;
    	$scope.btn_cambioEncargado = false;
    	
    	switch(queCambiar)
    	{
    		case "direccion":
    		var calle = $("#nuevaCalle").val();
    		var altura = $("#nuevaAltura").val();
    		var localidad = $("#nuevaLocalidad").val();

    		if(localidad != "CABA")
	        	$scope.nuevaDireccion = calle+" "+altura+", "+localidad+", "+"Buenos Aires";
	        else
	        	$scope.nuevaDireccion = calle+" "+altura+", "+localidad;

	        $scope.localElegido.direccion = $scope.nuevaDireccion;

	        //REALIZAR CAMBIO
	        $scope.actualizar = {};
            $scope.actualizar.cambio = "direccion";
            $scope.actualizar.id_local = $scope.localElegido.id_local;
            $scope.actualizar.nuevaDireccion = $scope.localElegido.direccion;
            servicioRetornoLocales.ABM_Local($scope.actualizar, "Modificar").then(function(respuesta){
            	console.info("Modificacion: ", respuesta);
            	setTimeout(function(){ $state.go('local.perfil'); }, 300);
           	},function errorCallback(response) {
		            console.log("FALLO al traer usuario! ", response);
		    });

    		//alert("Nueva direccion: " + $scope.nuevaDireccion);
    		break;

    		case "encargado":
    		//Villereada
            var cadena = String($("#empleadoElegido").val());
            var employee = cadena.split(":");
            var id_empleado = Number(employee[1]);

            servicioRetornoUsuarios.traerCiertosUsuarios(id_empleado).then(function(respuesta){
            	$scope.localElegido.encargado = respuesta.data.apellido + ", " + respuesta.data.nombre;
           	},function errorCallback(response) {
		            console.log("FALLO al traer usuario! ", response);
		    }); 

            //REALIZAR CAMBIO
            $scope.actualizar = {};
            $scope.actualizar.cambio = "encargado";
            $scope.actualizar.id_local = $scope.localElegido.id_local;
            $scope.actualizar.nuevoEncargado = id_empleado;
            servicioRetornoLocales.ABM_Local($scope.actualizar, "Modificar").then(function(respuesta){
            	console.info("Modificacion: ", respuesta);
            	setTimeout(function(){ $state.go('local.perfil'); }, 300);
           	},function errorCallback(response) {
		            console.log("FALLO al traer usuario! ", response);
		    });

    		//alert("Nuevo encargado: " + empleado);
    		break;
    	}
    }

     $scope.imagenProductos = function(oferta, criterio){
        
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

          $scope.tituloGaleria = "Productos asociados a la oferta";
          $('#verProductos').modal('show');

          setTimeout(function(){ mostrarFoto(slideIndex); }, 300);

    }//FIN de función imagenProductos

});