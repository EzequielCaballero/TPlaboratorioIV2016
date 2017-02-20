angular.module('ABMangularAPI.controladorUsuarioLogin', [])
  app.controller('controlUsuarioLogin', function($scope, $http, $state, $auth, servicioRetornoRegistroSesiones) {

    $scope.usuarioCorrecto = true;
    $scope.Perfil = function(usuario){

      switch(usuario)
      {
        case "Administrador":
            $scope.usuario= {};
            $scope.usuario.nombre = "Jonathan";
            $scope.usuario.apellido = "Robertson";
            $scope.usuario.correo = "jrobertson0@utexas.edu";
            $scope.usuario.clave = "utn_1234";
            break;

        case "Encargado":
            $scope.usuario= {};
            $scope.usuario.nombre = "Kevin";
            $scope.usuario.apellido = "Reed";
            $scope.usuario.correo = "kreed1@seattletimes.com";
            $scope.usuario.clave = "QDIGnRxGis";
            break;

        case "Empleado":
            $scope.usuario= {};
            $scope.usuario.nombre = "Johnny";
            $scope.usuario.apellido = "George";
            $scope.usuario.correo = "jgeorge5@addtoany.com";
            $scope.usuario.clave = "aNQND1";
            break;

        case "Cliente":
            $scope.usuario= {};
            $scope.usuario.nombre = "Katherine";
            $scope.usuario.apellido = "Lane";
            $scope.usuario.correo = "klaneh@yahoo.co.jp";
            $scope.usuario.clave = "nJHNO1Fl4B9G";
            break;

        default:
          $scope.usuario= {};
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
            $sesion = $auth.getPayload();
            $scope.registro = {};
            $scope.registro.id_usuario = $sesion.usuario;
            $scope.registro.nombre = $sesion.nombre;
            $scope.registro.tipo_usuario = $sesion.perfil;
            var hoy = new Date();
            $scope.registro.fecha = hoy.getFullYear() + "-" + (hoy.getMonth() +1) + "-" + hoy.getDate();
            $scope.registro.hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
            //console.info("Registro sesion: ", $scope.registro);
            $scope.ingreso_registro($scope.registro);
          }
          else
          {
            console.info("no token", $auth.getPayload());
            $scope.usuarioCorrecto = false;
          }
      })
      .catch(function(response) {
          console.info("incorrecto", response);
      });
    }

  $scope.ingreso_registro = function(registro){

    servicioRetornoRegistroSesiones.ABM_Registro_sesiones(registro, "Agregar").then(function(respuesta){

        console.info("Registro: ", respuesta.data);
        if($sesion.perfil != "Cliente")  
          $state.go("inicio");
        else
          $state.go("cliente.inicio");

      },function errorCallback(response) {
                console.log("FALLO RETORNO OPERACIONES! ", response);
    });
  }


  /*FIN CONTROLLER LOGIN*/  
  });