angular.module('ABMangularAPI.controladorClienteInicio', [])
  app.controller('controlClienteInicio', function($scope, $auth, $state, $http, servicioRetornoLocales) {
	  
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
	//IMPORTANTE! generación de Wait dado el tiempo que demanda cargar el DOM.
	setTimeout(function() 
	{
	   carousel();
	   /***SELECCION LOCAL********************************************/
	   $scope.seleccionLocal = function(local, numero){
			clearTimeout(timer);
			$scope.localELegido = "Ha seleccionado el Local N°" + numero;
			$scope.direccionLocal = local.direccion;
			$scope.localSelect = local;
		}

	}, 500);

	//FUNCIONES DE SLIDER
  	$scope.currentDiv = function(n) {
  	  showDivs(slideIndex = n);
  	  console.info("indice: ", n);
  	  clearTimeout(timer);
  	  setTimeout(carousel, 4000);
	}

	function showDivs(n) {
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
	    console.info("CLASES: ", x);
	    for (i = 0; i < x.length; i++) {
	       x[i].style.display = "none";  
	    }
	    slideIndex++;
	    if (slideIndex > x.length) {slideIndex = 1}    
	    x[slideIndex-1].style.display = "block";  
	    timer = setTimeout(carousel, 4000); // Change image every 4 seconds
	}

});

/****************************************************************************************/

/* ALTERNATIVAS PARA MANEJAR CARGA */
// 1) Manejador de eventos y contador
// 2) Utilización de un wait genérico mediante setTime() o timeOut()
// 3) Utilización de librerías para angular como Angular Busy.