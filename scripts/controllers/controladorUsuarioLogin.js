angular.module('ABMangularAPI.controladorUsuarioLogin', [])
  app.controller('controlUsuarioLogin', function($scope, $http, $state, $auth) {

    $scope.Perfil = function(usuario){

      switch(usuario)
      {
        case "Administrador":
            $scope.usuario= {};
            $scope.usuario.nombre = "Tony";
            $scope.usuario.email = "admin@admin.com";
            $scope.usuario.password = "4321";
            break;

        case "Encargado":
            $scope.usuario= {};
            $scope.usuario.nombre = "Charly";
            $scope.usuario.email = "vend@vend.com";
            $scope.usuario.password = "1111";
            break;

        case "Empleado":
            $scope.usuario= {};
            $scope.usuario.nombre = "Braian";
            $scope.usuario.email = "compr@compr.com";
            $scope.usuario.password = "1234";
            break;

        case "Cliente":
            $scope.usuario= {};
            $scope.usuario.nombre = "Braian";
            $scope.usuario.email = "compr@compr.com";
            $scope.usuario.password = "1234";
            break;

        default:
          $scope.usuario= {};
          $scope.usuario.email = "";
          $scope.usuario.nombre = "";
          $scope.usuario.password = "";
          if($auth.isAuthenticated())
          {
            $auth.logout();
            $state.go("inicio");
            console.info("no token", $auth.getPayload());
          }
          break;
      }
    }

    if($auth.isAuthenticated())
      console.info("token", $auth.getPayload());
    else
      console.info("no token", $auth.getPayload());

    // FUNCION PARA LOGUEARSE DENTRO DE LA PAGINA
    $scope.Login = function(){

      //Esto es una llamada equivalente a $http
      $auth.login($scope.usuario)
      .then(function(response) {
          console.info("correcto", response);

          //CHEQUEO DE SESION ACTIVA O NO
          if($auth.isAuthenticated())
          {
            console.info("token", $auth.getPayload());
            $state.go("inicio");
          }
          else
            console.info("no token", $auth.getPayload());
        // Redirect user here after a successful log in.
      })
      .catch(function(response) {
          console.info("incorrecto", response);
        // Handle errors here, such as displaying a notification
        // for invalid email and/or password.
      });
    }
  });