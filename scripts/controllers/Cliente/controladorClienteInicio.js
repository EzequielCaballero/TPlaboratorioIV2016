angular.module('ABMangularAPI.controladorClienteInicio', [])
  app.controller('controlClienteInicio', function($scope, $auth, $state, $http, servicioRetornoLocales, NgMap) {
	  
  	  // $("#imagenBase").attr("src","img/Backgrounds/Logo_1.png");
  	  //DEFINIR LOADING
  	  $scope.verLocales = false;
  	  $scope.loadingData = true;

	  if($auth.isAuthenticated())
	  {
	  	$sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
        $scope.nombrePerfil = "BIENVENIDO: "+$sesion.nombre;
      }

      //TRAIGO LOCALES
      servicioRetornoLocales.traerTodo().then(function(respuesta){        

      	$scope.lista_locales = respuesta.data;
      	//DESACTIVACION DE LOADING
	    $scope.loadingData = false;
	    $scope.verLocales = true;
      	console.info("LOCALES: ", $scope.lista_locales);
	  	},function errorCallback(response) {
                console.log("FALLO al traer locales! ", response);
      });



/********************************************CARGA IMAGENES LOCALES********************************************/
	$scope.mostrarMapa = false;

	$scope.localELegido;
	$scope.confirmarLocal;
	$scope.marker = new MarkerWithLabel({
        title: 'default'
    });
	
	/***SELECCION LOCAL********************************************/
    $scope.seleccionLocal = function(local, numero){
		$scope.localELegido = "Ha seleccionado el Local N°" + numero;
		$scope.direccionLocal = local.direccion;
		console.info("Local seleccionado: ", local);
		$scope.confirmarLocal = local;
		
		/*MAPA*/

		//Definición tamaño de icono 
	      var marcador = {
	          url: "img/GoogleMaps/marker_local_2.png", // url
	          scaledSize: new google.maps.Size(40, 40), // scaled size
	          origin: new google.maps.Point(0,0), // origin
	          anchor: new google.maps.Point(0, 0) // anchor
	      };

	    NgMap.getMap("mapa_local").then(function(map) {

	           //GEODECODER AND MODAL WINDOW
	           var geocoder = new google.maps.Geocoder();
	           console.info("Geodecoder inicial: ", geocoder);
	           //elimino el marker anterior del mapa
	           $scope.marker.setMap(null);
	           
	           if (geocoder) {
	                geocoder.geocode( { 'address': local.direccion}, function(results, status) {
	                if (status == google.maps.GeocoderStatus.OK) {
	                  if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
	                    google.maps.event.trigger(map, "resize");
	                    map.setCenter(results[0].geometry.location);
	                    map.setZoom(15);
	                    console.info("Geodecoder: ", results);

	                    $scope.location = results[0].geometry.location;

	                    $scope.marker = new MarkerWithLabel({
	                        position: results[0].geometry.location,
	                        icon: marcador,
	                        draggable: false,
	                        //animation: google.maps.Animation.DROP,
	                        title: "Local",
	                        labelContent: "Local N°"+numero, //Etiqueta agregada para el marker.
	                        labelClass:"etiquetaMapa", // define la clase a la que pertence el label a fin de fijar su estilo en CSS.
	                        labelAnchor: new google.maps.Point(22, 0),
	                        labelStyle: {opacity: 0.75}
	                    });
	                    $scope.marker.setMap(map);

	                  } else {
	                     console.info("Sin resultados");
	                  }
	                } else {
	                   console.info("Geocode was not successful for the following reason: ", status);
	                }
	              });//FIN funcion geodecoder
	                $scope.mostrarMapa = true;
	            }//FIN if geodecoder

	            $("#localSeleccionado").on("shown.bs.modal", function(e) {
	           //map.setCenter(myLatLng);// Set here center map coordinates
	                google.maps.event.trigger(map, "resize");
	                map.setCenter($scope.location);
	                map.setZoom(15);

	            });//FIN ventana modal
	    });//FIN NgMAP
  
	//FIN FUNCION MOSTRAR MAPA 
	}

	$scope.irLocalSeleccionado = function(){
		setTimeout(function(){ $state.go('cliente.menu_local', {obj:$scope.confirmarLocal}); }, 300);
	}

});

/********************************************CARGA MAPA GOOGLE********************************************/

// function resizeMap() {
//    if(typeof map =="undefined") return;
//    setTimeout( function(){resizingMap();} , 400);
// }

// function resizingMap() {
//    if(typeof map =="undefined") return;
//    var center = map.getCenter();
//    google.maps.event.trigger(map, "resize");
//    map.setCenter(center); 
// }

/****************************************************************************************/

/* ALTERNATIVAS PARA MANEJAR CARGA */
// 1) Manejador de eventos y contador
// 2) Utilización de un wait genérico mediante setTime() o timeOut()
// 3) Utilización de librerías para angular como Angular Busy.