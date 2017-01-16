angular.module('ABMangularAPI.controladorInicio', [])
  
  app.controller('controlInicio', function($scope, $auth, $state, $http) {
	  $scope.perfilActivo="**N/N**";
	  $scope.titulo="Pizzeria ARGenta S.R.L.";
	  $scope.imagenLogueado = "img/backgrounds/Logo_1.png";
	  $scope.imagenPorDefecto = "img/backgrounds/Fondo_2.png";

	  $("#imagenBase").attr("src",$scope.imagenPorDefecto);

	  //Ocultar o mostrar botones
	  $scope.ABMusuarios = "true";
	  $scope.Login = "false";
	  $scope.logout = "true";

	  if($auth.isAuthenticated())
      {
      	$("#imagenBase").attr("src",$scope.imagenLogueado);
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

	      case "Inicio":
	      default:
	        $state.go("inicio");
	        break;
	    }
	  }

});