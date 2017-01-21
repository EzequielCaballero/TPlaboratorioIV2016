 angular.module('ABMangularAPI.controladorUsuarioRegistro', []) 
  app.controller('controlUsuarioRegistro', function($scope, $http, $state, $auth, servicioRetornoUsuarios) {
    
    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
    }

    $scope.tipoUser = true;
    $scope.tipoLocal = true;

    if($sesion.perfil != "Cliente" && $sesion.perfil !="Empleado")
    {
      $scope.tipoUser = false;

      if($sesion.perfil == "Administrador")
        $scope.tipoLocal = false;
    }

    $scope.DatoRegistro="***REGISTRO USUARIO***";
    $scope.DatoSubmit = "Registrarse";

    //OPCIONES DEL ELEMENTO SELECT (creación de Options)
    $scope.opciones = [
      {code:"admin", name: "Encargado"},
      {code:"vend", name:"Empleado" },
      {code:"compr", name:"Cliente" }
    ];

    $scope.locales = [
      {code:"1", name: "Local 1"},
      {code:"2", name:"Local 2" },
      {code:"3", name:"Local 3" }
    ];

    $scope.tipoUsers = false;

    $scope.usuario={};
    $scope.usuario.nombre = "natalia";
    $scope.usuario.email = "natalia@natalia.com";
    $scope.usuario.edad = 25;
    $scope.usuario.sexo = "Masculino";

    $scope.calle = "Av. Calchaqui";
    $scope.altura = 2200;
    $scope.localidad = "Quilmes";

    $scope.coordenadas = "0, 0";
    $scope.usuario.password = "1234";
    $scope.usuario.password2 = "1234"
    $scope.usuario.tipo = "";
    $scope.usuario.estado = "activo";
    $scope.usuario.id_local = "";

    $scope.Guardar=function(){
      
      if($scope.localidad != "CABA")
        $scope.usuario.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad+", "+"Buenos Aires";
      else
        $scope.usuario.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad;

      servicioRetornoUsuarios.ABM_Usuario($scope.usuario, "Agregar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
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