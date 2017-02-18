angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlCliente', function($scope, $http, $state, $auth) {

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.nombre;
			if($sesion.perfil == "Cliente")
				$scope.esCliente = true;
			else
				$scope.esCliente = false;
		}
		else
			$state.go("inicio");

	$scope.direccionar=function($direccion){

	    //VALIDACION DE SESION DE USUARIO (por defecto)
	    switch($direccion)
	    {

	      case "Logout":
	      	$auth.logout();
	      	$state.go("inicio");
	      	break;

	      case "Perfil":
	      	$state.go("cliente.perfil");
	      	break;
	    }
	}

});