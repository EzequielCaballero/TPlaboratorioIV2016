angular.module('ABMangularAPI.controladorLocalPerfil', [])   
  app.controller('controlLocalPerfil', function($scope, $http, $state, $auth, $stateParams, servicioRetornoLocales, servicioRetornoUsuarios, servicioRetornoOfertas) {

  	if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
        $sesion = $auth.getPayload();

    console.info("Parametro recibido: ", $stateParams);
    $scope.DatoRegistro = "***DATOS DEL LOCAL***";
    $scope.id_local = $stateParams.id;

    $scope.localElegido = {};
    servicioRetornoLocales.traerCiertosLocales($scope.id_local).then(function(respuesta){

    	$scope.localElegido = respuesta.data;
    	console.info("Local traído: ", respuesta.data);
    	$scope.verPerfilLocal = true;
    	$scope.botonVerOfertas = true;
    	
    	if($sesion.perfil == "Administrador" || $sesion.perfil == "Encargado" && $sesion.local == $scope.id_local)
    	{
    		$scope.botonActualizar = true;
    	}

	},function errorCallback(response) {
          console.log("FALLO traer locales: ", response);
    });

});