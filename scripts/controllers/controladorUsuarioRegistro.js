 angular.module('ABMangularAPI.controladorUsuarioRegistro', []) 
  app.controller('controlUsuarioRegistro', function($scope, $http, $state, $auth, servicioRetornoUsuarios) {
    
    $scope.tipoUser = true;
    $scope.tipoLocal = true;
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
    $scope.usuario.email = "natalia@natalia.com";
    $scope.usuario.edad = 25;
    $scope.usuario.sexo = "Masculino";

    //Dirección
    $scope.calle = "Av. Calchaqui";
    $scope.altura = 2200;
    $scope.localidad = "Quilmes";
    $scope.coordenadas = "0, 0";

    //Contraseña
    $scope.usuario.password = "1234";
    $scope.usuario.password2 = "1234"

    //Estado del user
    $scope.usuario.tipo = "";
    $scope.usuario.estado = "activo";
    $scope.usuario.id_local = "";

    $scope.EleccionUser=function(){
      switch($scope.usuario.tipo)
      {
        case "Encargado":
          $("#opcionLocal").show();
          $("#alertaOpcionLocal").show();
        break;
        case "Empleado":
          $("#opcionLocal").show();
          $("#alertaOpcionLocal").show();
        break;
        case "Cliente":
          $("#opcionLocal").hide();
          $("#alertaOpcionLocal").hide();
        break;
      }
    }

    $scope.Guardar=function(){
      
      if($scope.localidad != "CABA")
        $scope.usuario.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad+", "+"Buenos Aires";
      else
        $scope.usuario.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad;

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

      // $scope.Guardar = function(){
      //   $http.post('http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/' + JSON.stringify($scope.usuario))
      //   .then(function(respuesta) {
      //      //aca se ejetuca si retorno sin errores
      //    console.log("RETORNO: ", respuesta.data);
      //    $state.go("usuario.grilla");

      //   },function errorCallback(response) {
      //     console.log("FALLO! ", response);
      //   });
      // }
});