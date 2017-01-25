 angular.module('ABMangularAPI.controladorUsuarioRegistro', []) 
  app.controller('controlUsuarioRegistro', function($scope, $http, $state, $auth, servicioRetornoUsuarios, servicioRetornoLocales) {
    
    $scope.tiposUsers = true;
    $scope.tipoLocal = true;
    $scope.requiredLocal = true;
    $scope.requiredTipoUser = true;
    $scope.DatoRegistro="***REGISTRO USUARIO***";

    if(!$auth.isAuthenticated())
    {
        $scope.nuevoUser = true;
        $scope.requiredLocal = false;
        $scope.requiredTipoUser = false;
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
            $scope.tiposUsers = false;
            $scope.opciones = [
            {code:"empleado", name:"Empleado" },
            {code:"cliente", name:"Cliente" }
            ];
            break;

          case "Administrador":
            $scope.tiposUsers = false;
            $scope.adminLogueado = true;
            $scope.opciones = [
            {code:"encargado", name: "Encargado"},
            {code:"empleado", name:"Empleado" },
            {code:"cliente", name:"Cliente" }
            ];
            break;
        }
    }

    //OPCIONES DEL ELEMENTO SELECT (creación de Options)
    servicioRetornoLocales.traerTodo().then(function(respuesta){
      console.info("Locales", respuesta.data);
      

      },function errorCallback(response) {
            console.log("FALLO! ", response);

    });

    $scope.locales = [
      {code:"2001", name: "Local 1"},
      {code:"2002", name: "Local 2" },
      {code:"2003", name: "Local 3" },
      {code:"2004", name: "Local 4" }
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
    if($scope.nuevoUser)
      $scope.usuario.tipo_user = "cliente";
    else
       $scope.usuario.tipo_user = null;
     
    $scope.usuario.estado = "activo";
    $scope.usuario.id_local = null;

    $scope.EleccionUser=function(){
      switch($scope.usuario.tipo_user)
      {
        case "encargado":
        case "empleado":
          if($scope.adminLogueado)
          {
            $scope.tipoLocal = false;
            $scope.requiredLocal = true;
          }
        break;
        case "cliente":
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