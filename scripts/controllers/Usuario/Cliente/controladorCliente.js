angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlCliente', function($scope, $http, $state, $auth) {

		$scope.perfilUsuario = "indefinido";

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.nombre;
		}

	$scope.direccionar=function($direccion){

	    //VALIDACION DE SESION DE USUARIO (por defecto)
	    switch($direccion)
	    {

	      case "Logout":
	      	$auth.logout();
	      	$state.go("inicio");
	      	break;

	      case "Perfil":
	      	$state.go("usuario.perfil");
	      	break;
	    }
	}

});