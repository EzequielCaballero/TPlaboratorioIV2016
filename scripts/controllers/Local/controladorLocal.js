angular.module('ABMangularAPI.controladorLocal', [])
	app.controller('controlLocal', function($scope, $http, $state, $auth) {

		$scope.perfilUsuario = "indefinido";

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.perfil;
		}

	});