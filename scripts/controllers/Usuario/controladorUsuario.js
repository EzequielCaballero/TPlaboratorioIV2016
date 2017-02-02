angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlUsuario', function($scope, $http, $state, $auth) {
		
		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.perfil;
		}
		else
			$state.go("usuario.login");

	});