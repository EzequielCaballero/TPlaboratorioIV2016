angular.module('ABMangularAPI.controladorLocalAlta', [])
  app.controller('controlLocalAlta', function($scope, $http, $state, $auth, FileUploader, servicioRetornoUsuarios, servicioRetornoLocales) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
    }

    $scope.DatoSubmit = "Crear";
    //CARGA DE OPCIONES -> Consulta a BD
    var empleados = Array();
    servicioRetornoUsuarios.traerCiertosUsuarios("solo_Empleados").then(function(respuesta){
      console.info("empleados", respuesta.data);

      //2- Rellenado de "empleados" (array de objetos)
      var cantidadDatos = respuesta.data.length;
      for (var i = 0; i < cantidadDatos; i++) {
        var nombreEmpleado = respuesta.data[i].apellido + ", " + respuesta.data[i].nombre;
        empleados[i] = {code: respuesta.data[i].id_usuario, name: nombreEmpleado };
      }
      console.info("Opciones de empleados:", empleados);

      //3- Pasaje de Array a JSON (OPCIONAL)
      empleados = JSON.stringify(empleados);
      console.info("Local 1: ", empleados);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
    });
    //4- Asignación de opciones al Select usuarios.
    $scope.usuarios = empleados;

    /************DATOS HARD-CODEADOS**************/
    $scope.local = {};
    //Dirección
    $scope.calle = "Av. Calchaqui";
    $scope.altura = 2200;
    $scope.localidad = "Quilmes";

    $scope.local.coordenadas = "0, 0";
    $scope.local.id_encargado = null;
    /********************************************/

    $scope.crearLocal=function(){
      //Validar dirección seleccionada
      if($scope.localidad != "CABA")
      $scope.local.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad+", "+"Buenos Aires";
      else
        $scope.local.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad;

      //Ejecutar consulta SQL
      servicioRetornoLocales.ABM_Local($scope.local, "Agregar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
          $state.go("local.grilla");
          console.info(respuesta.data);

        },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
    }

});