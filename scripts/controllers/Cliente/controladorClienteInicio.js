angular.module('ABMangularAPI.controladorClienteInicio', [])
  app.controller('controlClienteInicio', function($scope, $auth, $state, $http, servicioRetornoLocales, NgMap, spinnerService) {
	  
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
      	total = respuesta.data.length;
      	//DESACTIVACION DE LOADING
	    $scope.loadingData = false;
	    $scope.verLocales = true;
      	console.info("LOCALES: ", $scope.lista_locales);
	  },function errorCallback(response) {
                console.log("FALLO al traer locales! ", response);
      });



/********************************************CARGA IMAGENES LOCALES********************************************/
	var slideIndex = 0;
	var timer;

	$scope.mostrarMapa = false;
	$scope.loadingDataMapa = true;

	$scope.localELegido;
	$scope.confirmarLocal;
	$scope.marker = new google.maps.Marker({
        title: 'default'
      });
	//IMPORTANTE! generación de Wait dado el tiempo que demanda cargar el DOM.
	setTimeout(function() 
	{
	   //CARGA DE FOTOS
	   carousel();

	    /***SELECCION LOCAL********************************************/
	    $scope.seleccionLocal = function(local, numero){
			clearTimeout(timer);
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

			     $scope.ubicacion = local.direccion;
			     //elimino el marker anterior del mapa
			     $scope.marker.setMap(null);

		            $("#localSeleccionado").on("shown.bs.modal", function(e) {
				       //map.setCenter(myLatLng);// Set here center map coordinates
				      //GEODECODER AND MODAL WINDOW
		         	  var geocoder = null;
		         	  geocoder = new google.maps.Geocoder();
		         	  console.info("Geodecoder inicial: ", geocoder)

				      if (geocoder) {
				      	geocoder.geocode( { 'address': local.direccion}, function(results, status) {
				        if (status == google.maps.GeocoderStatus.OK) {
				          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
				          	google.maps.event.trigger(map, "resize");
				            map.setCenter(results[0].geometry.location);
				            map.setZoom(15);
				            console.info("Geodecoder: ", results);

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
			          }//FIN if geodecoder
			        });//FIN ventana modal
			        $scope.mostrarMapa = true;
				 	$scope.loadingDataMapa = false;
    		});//FIN NgMAP

		}//FIN FUNCION Seleccion Local

		$scope.irLocalSeleccionado = function(){
			setTimeout(function(){ $state.go('cliente.menu_local', {obj:$scope.confirmarLocal}); }, 300);
		}

	}, 500);

	//FUNCIONES DE SLIDER
  	$scope.currentDiv = function(n) {
  	  showDivs(slideIndex = n);
  	  console.info("indice: ", n);
	}

	function showDivs(n) {
		clearTimeout(timer);
		var j;
	    var k = document.getElementsByClassName("mySlides");
		for (j = 0; j < k.length; j++) {
	       k[j].style.display = "none";  
	    }
	   k[n].style.display = "block";
	}

	function carousel() {
	    var i;
	    var x = document.getElementsByClassName("mySlides");
	    //console.info("CLASES: ", x);
	    for (i = 0; i < x.length; i++) {
	       x[i].style.display = "none";  
	    }
	    slideIndex++;
	    if (slideIndex > x.length) {slideIndex = 1}    
	    x[slideIndex-1].style.display = "block";  
	    timer = setTimeout(carousel, 4000); // Change image every 4 seconds
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