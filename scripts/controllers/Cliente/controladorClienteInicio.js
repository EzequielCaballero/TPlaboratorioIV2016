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


	//PRIMER LLAMADA A SLIDER (WAIT 1 sec)
	var slideIndex = 1;
	setTimeout(function() 
	{
	   showDivs(slideIndex);
	}, 1000);

	//FUNCIONES DE SLIDER
  	$scope.plusDivs = function(n) {
	  showDivs(slideIndex += n);
	}

	function showDivs(n) {
	  var i;
	  var x = document.getElementsByClassName("mySlides");
	  console.info("CLASES: ", x);
	  if (n > x.length) {slideIndex = 1}    
	  if (n < 1) {slideIndex = x.length}
	  for (i = 0; i < x.length; i++) {
	     x[i].style.display = "none";  
	  }
	  x[slideIndex-1].style.display = "block";  
	}

});

/* ALTERNATIVAS PARA MANEJAR CARGA */
// 1) Manejador de eventos y contador
// 2) Utilización de un wait genérico mediante setTime() o timeOut()
// 3) Utilización de librerías para angular como Angular Busy.