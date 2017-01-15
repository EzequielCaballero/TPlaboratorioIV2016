angular.module('ABMangularAPI.controladorInicio', [])
  
  app.controller('controlInicio', function($scope, $auth, $state, $http) {
	  $scope.perfilActivo="**N/N**";
	  $scope.titulo="Inicio y presentacion de la WEB";
	  
	  //Ocultar o mostrar botones
	  $scope.ABMusuarios = "true";
	  $scope.Login = "false";
	  $scope.logout = "true";

	  if($auth.isAuthenticated())
      {
      	$sesion = $auth.getPayload();    
      	$scope.perfilActivo = $sesion.perfil;
      	$scope.login = "true";
      	$scope.logout = "false";

      	if($sesion.perfil == "Administrador")
      		$scope.ABMusuarios = "false";  
      }

	  $scope.direccionar=function($direccion){

	    //VALIDACION DE SESION DE USUARIO (por defecto)
	    switch($direccion)
	    {
	      case "Login":
	      	$state.go("usuario.login");
	      	break;

	      case "Logout":
	      	$auth.logout();
	      	location.reload(true);
	      	break;

	      case "MenuUsuarios":
	      	$state.go("usuario.menu");
	      	break;

	      case "MenuEntidades":
	      	$state.go("entidad.menu");
	      	break;

	      default:
	        $state.go("inicio");
	        break;
	    }
	  }
});