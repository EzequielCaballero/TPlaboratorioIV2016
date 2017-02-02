angular.module('ABMangularAPI.controladorClienteInicio', [])
  
  app.controller('controlClienteInicio', function($scope, $auth, $state, $http) {
	  
  	  $("#imagenBase").attr("src","img/Backgrounds/Logo_1.png");

	  if($auth.isAuthenticated())
	  {
	  	$sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
        $scope.nombrePerfil = "BIENVENIDO: "+$sesion.nombre;
      }

});