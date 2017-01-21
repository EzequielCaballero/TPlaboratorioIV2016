 angular.module('ABMangularAPI.controladorUsuarioRegistro', []) 
  app.controller('controlUsuarioRegistro', function($scope, $http, $state, $auth, servicioRetornoUsuarios) {
    
    $scope.tipoUser = true;
    $scope.tipoLocal = true;
    $scope.requiredLocal = true;
    $scope.DatoRegistro="***REGISTRO USUARIO***";

    if(!$auth.isAuthenticated())
    {
        $scope.nuevoUser = true;
        $scope.DatoSubmit = "Registrarse";
    }
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
        $scope.DatoSubmit = "Registrar";
        switch($sesion.perfil)
        {
          case "Cliente":
          case "Empleado":
            break;

          case "Encargado":
            $scope.tipoUser = false;
            $scope.opciones = [
            {code:"emp", name:"Empleado" },
            {code:"clt", name:"Cliente" }
            ];
            break;

          case "Administrador":
            $scope.tipoUser = false;
            $scope.tipoLocal = false;
            $scope.opciones = [
            {code:"Encargado", name: "Encargado"},
            {code:"Empleado", name:"Empleado" },
            {code:"Cliente", name:"Cliente" }
            ];
            break;
        }
    }

    //OPCIONES DEL ELEMENTO SELECT (creación de Options)
    $scope.locales = [
      {code:"1", name: "Local 1"},
      {code:"2", name: "Local 2" },
      {code:"3", name: "Local 3" },
      {code:"3", name: "Local 4" }
    ];

    $scope.tipoUsers = false;

    $scope.usuario={};
    //Datos generales
    $scope.usuario.nombre = "natalia";
    $scope.usuario.apellido = "gonzalez";
    $scope.usuario.edad = 25;
    $scope.usuario.sexo = "Masculino";
    $scope.usuario.correo = "natalia@gonzalez.com";


    //Dirección
    $scope.calle = "Av. Calchaqui";
    $scope.altura = 2200;
    $scope.localidad = "Quilmes";
    $scope.usuario.coordenadas = "0, 0";

    //Contraseña
    $scope.usuario.clave = "1234";
    $scope.usuario.clave2 = "1234"

    //Estado del user
    $scope.usuario.tipo_user = "";
    $scope.usuario.estado = "activo";
    $scope.usuario.id_local = "";

    $scope.EleccionUser=function(){
      switch($scope.usuario.tipo_user)
      {
        case "Encargado":
          $scope.tipoLocal = false;
          $scope.requiredLocal = true;
        break;
        case "Empleado":
          $scope.tipoLocal = false;
          $scope.requiredLocal = true;
        break;
        case "Cliente":
          $scope.tipoLocal = true;
          $scope.requiredLocal = false;
        break;
      }
    }

    $scope.Guardar=function(){
      //Validar dirección seleccionada
      if($scope.localidad != "CABA")
        $scope.usuario.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad+", "+"Buenos Aires";
      else
        $scope.usuario.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad;

      //Ejecutar consulta SQL
      servicioRetornoUsuarios.ABM_Usuario($scope.usuario, "Agregar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
          if($scope.nuevoUser)
            $state.go("inicio");
          else
            $state.go("usuario.grilla");
          console.info(respuesta.data);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
    }
});