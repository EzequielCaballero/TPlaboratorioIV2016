angular.module('ABMangularAPI.controladorClienteInicio', [])
  app.controller('controlClienteInicio', function($scope, $auth, $state, $http, servicioRetornoLocales, NgMap) {
	  
  	  $("#imagenBase").attr("src","img/Backgrounds/Logo_1.png");

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
      	console.info("LOCALES: ", $scope.lista_locales);
	  });


/********************************************CARGA IMAGENES LOCALES********************************************/
	var slideIndex = 0;
	var timer;

	$scope.localELegido;
	$scope.confirmarLocal;
	$scope.marker = new google.maps.Marker({
        title: 'default'
      });
	//IMPORTANTE! generación de Wait dado el tiempo que demanda cargar el DOM.
	setTimeout(function() 
	{
	   carousel();
	   /***SELECCION LOCAL********************************************/
	   $scope.seleccionLocal = function(local, numero){
			clearTimeout(timer);
			$scope.localELegido = "Ha seleccionado el Local N°" + numero;
			$scope.direccionLocal = local.direccion;
			$scope.confirmarLocal = local;
			
			/*MAPA*/
			var arrayUbicacion = local.coordenadas.split(/,/);
		    var latitud = arrayUbicacion[0];
		    var longitud = arrayUbicacion[1].replace(" ","");
			myLatLng = {lat: Number(latitud), lng: Number(longitud)};
			console.info("UBICACION-coordenadas: ", myLatLng);

			var marcador = {
			    url: "img/GoogleMaps/marker_1.png", // url
			    scaledSize: new google.maps.Size(35, 35), // scaled size
			    origin: new google.maps.Point(0,0), // origin
			    anchor: new google.maps.Point(0, 0) // anchor
			};

			NgMap.getMap("mapa_local").then(function(map) {
		      //$scope.ubicacion = local.direccion;
		      //elimino el marker anterior del mapa
		      $scope.marker.setMap(null);

		    //   $scope.marker = new google.maps.Marker({
		    //     position: myLatLng,
		    //     icon: "img/GoogleMaps/marker_1.png",
		    //     draggable: true,
		    //     animation: google.maps.Animation.DROP,
		    //     title: "Local",
		    //     label: "Local N°"+numero
		    // });

		    $scope.marker = new MarkerWithLabel({
	          position: myLatLng,
	          icon: marcador,
	          draggable: true,
	          //animation: google.maps.Animation.DROP,
	          title: "Local",
	          labelContent: "Local N°"+numero, //Etiqueta agregada para el marker.
	          labelClass:"etiquetaMapa", // define la clase a la que pertence el label a fin de fijar su estilo en CSS.
	          labelAnchor: new google.maps.Point(22, 0),
	          labelStyle: {opacity: 0.75}
	        });

	        $scope.marker.setMap(map);

	        $("#localSeleccionado").on("shown.bs.modal", function(e) {
		      google.maps.event.trigger(map, "resize");
		       map.setCenter(myLatLng);// Set here center map coordinates
		       map.setZoom(15);
		    });

    });

		}
		$scope.irLocalSeleccionado = function(){
			setTimeout(function(){ $state.go('cliente.menu_local', {obj:$scope.confirmarLocal}); }, 300);
		}

	}, 400);

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
// var map;        
// var myCenter=new google.maps.LatLng(53, -1.33);
// var marker=new google.maps.Marker({
//     position:myCenter
// });

// function initialize() {
//   var mapProp = {
//       center:myCenter,
//       zoom: 14,
//       draggable: false,
//   };
  
//   map=new google.maps.Map(document.getElementById("mapa-local"),mapProp);
//   marker.setMap(map);
    
//   google.maps.event.addListener(marker, 'click', function() {
      
//     infowindow.setContent(contentString);
//     infowindow.open(map, marker);
    
//   }); 
// };
// google.maps.event.addDomListener(window, 'load', initialize);

// google.maps.event.addDomListener(window, "resize", resizingMap());

// $('#localSeleccionado').on('show.bs.modal', function() {
//    //Must wait until the render of the modal appear, thats why we use the resizeMap and NOT resizingMap!! ;-)
//    resizeMap();
// })

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