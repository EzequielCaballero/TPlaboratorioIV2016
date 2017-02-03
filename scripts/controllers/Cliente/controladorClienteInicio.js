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
      	console.info("LOCALES: ", $scope.lista_locales);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
      
      //MUESTRA DE FOTOS
      // showDivs(slideIndex);
      // var slideIndex = 1;
      // var tiempo; 

      // //FUNCIONES DE SLIDER
      // function showDivs(n) {
      //   var i;
      //   var x = document.getElementsByClassName("mySlides");
      //   var dots = document.getElementsByClassName("demo");
      //   if (n > x.length) {slideIndex = 1}    
      //   if (n < 1) {slideIndex = x.length}
      //   for (i = 0; i < x.length; i++) {
      //      x[i].style.display = "none";  
      //   }
      //   for (i = 0; i < dots.length; i++) {
      //      dots[i].className = dots[i].className.replace(" w3-white", "");
      //   }
      //   x[slideIndex-1].style.display = "block";  
      //   dots[slideIndex-1].className += " w3-white";
      //   tiempo = setTimeout(carousel, 5000); // Change image every 5 seconds
      // }

      // function carousel() {
      //   var i;
      //   var x = document.getElementsByClassName("mySlides");


      //   for (i = 0; i < x.length; i++) {
      //      x[i].style.display = "none";  
      //   }
      //   slideIndex++;
      //   if (slideIndex > x.length) {slideIndex = 1}    
      //   x[slideIndex-1].style.display = "block";

      //   $scope.currentDiv(slideIndex);
      // }

      // $scope.plusDivs = function(n) {
      //   showDivs(slideIndex += n);
      // }

      // $scope.currentDiv = function(n) {
      //   showDivs(slideIndex = n);
      // }

      // clearTimeout(tiempo);
 
});