angular.module('ABMangularAPI.controladorEntidad', [])
	app.controller('controlEntidad', function($scope, $http, $state, $auth) {

		$scope.perfilUsuario = "undefined";

		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.perfil;
			
			switch($scope.perfilUsuario)
			{
				case "Administrador":
				case "Vendedor":
					$scope.hideABM = false;
					break;
				case "Comprador":
				default:
					$scope.hideABM = true;
					break;
			}
		}
		
	});