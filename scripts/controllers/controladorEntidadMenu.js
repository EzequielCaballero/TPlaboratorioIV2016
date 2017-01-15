angular.module('ABMangularAPI.controladorEntidadMenu', [])
	app.controller('controlEntidadMenu', function($scope, $http, $state, $auth) {

		$scope.direccionar = function(ruta){

			switch(ruta)
			{
				case "Alta":
				$state.go("entidad.alta");
				break;
				case "Baja":
				case "Modificar":
				$state.go("entidad.grilla");
				break;
				case "Grilla":
				$state.go("entidad.grilla");
				break;
			}
		}

	});