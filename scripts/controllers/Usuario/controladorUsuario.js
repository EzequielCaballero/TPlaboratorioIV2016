angular.module('ABMangularAPI.controladorUsuario', [])
	app.controller('controlUsuario', function($scope, $http, $state, $auth) {
		
		if($auth.isAuthenticated())
		{
			$sesion = $auth.getPayload();
			$scope.perfilUsuario = $sesion.perfil;
		}

	$scope.logOut = function(){
		$auth.logout();
	    $state.go("inicio");
	}

});