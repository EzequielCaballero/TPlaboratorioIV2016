angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlUsuario', function($scope, $http, $state, $auth) {
	
	$scope.botonDesloguearse = false;

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = "PERFIL: " + $sesion.perfil;
			$scope.botonDesloguearse = true;
		}

	$scope.logOut = function(){
		$auth.logout();
	    $state.go("inicio");
	}

});