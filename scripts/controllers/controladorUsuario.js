angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlUsuario', function($scope, $http, $state, $auth) {

		$scope.perfilUsuario = "undefined";

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.usuario;
		}

	});