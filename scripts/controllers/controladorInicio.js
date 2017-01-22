angular.module('ABMangularAPI.controladorInicio', [])
  
  app.controller('controlInicio', function($scope, $auth, $state, $http) {
	  $scope.perfilActivo="**N/N**";
	  $scope.titulo="Pizzeria ARGENTA S.R.L.";
	  $scope.imagenLogueado = "img/backgrounds/Logo_4.png";
	  $scope.imagenPorDefecto = "img/backgrounds/Logo_4.png";
	  $("#intro").attr("class","btn btn-danger animated flash");
	  $scope.perfilActivo = "Por favor, inicie sesión";

	  $("#imagenBase").attr("src",$scope.imagenPorDefecto);

	  //Ocultar o mostrar botones
	  $scope.ABMusuarios = "true";
	  $scope.Login = "false";
	  $scope.logout = "true";

	  if($auth.isAuthenticated())
      {
      	$("#imagenBase").attr("src",$scope.imagenLogueado);
      	$("#intro").attr("class","fraseLogueado");
      	$sesion = $auth.getPayload();    

      	$scope.perfilActivo = "BIENVENIDO: "+$sesion.nombre;
      	$scope.login = "true";
      	$scope.logout = "false";

      	if($sesion.perfil != "Cliente")
      		$scope.ABMusuarios = "false";  
      }

	  $scope.direccionar=function($direccion){

	    //VALIDACION DE SESION DE USUARIO (por defecto)
	    switch($direccion)
	    {
	      case "Registrarse":
	      	$state.go("usuario.registro");
	      	break;

	      case "Login":
	      	$state.go("usuario.login");
	      	break;

	      case "Logout":
	      	$auth.logout();
	      	location.reload(true);
	      	break;

	      case "Perfil":
	      	$state.go("usuario.perfil");
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

	  $scope.ingreso=function($direccion){
	  	if(!$auth.isAuthenticated())
	  		$state.go("usuario.login");
	  }
});