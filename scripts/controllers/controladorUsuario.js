angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlUsuario', function($scope, $http, $state, $auth) {

		$scope.perfilUsuario = "indefinido";

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.perfil;
		}

	});