angular.module('ABMangularAPI.controladorLocal', [])
	app.controller('controlLocal', function($scope, $http, $state, $auth) {
		
		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.perfil;
		}
		else
			$state.go("inicio");

	});