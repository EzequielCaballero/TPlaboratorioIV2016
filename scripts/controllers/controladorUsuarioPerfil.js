 angular.module('ABMangularAPI.controladorUsuarioPerfil', []) 
  app.controller('controlUsuarioPerfil', function($scope, $http, $state, servicioRetornoUsuarios) {

    $scope.DatoRegistro="***REGISTRO USUARIO***";
    $scope.DatoSubmit = "Registrarse";
    //OPCIONES DEL ELEMENTO SELECT (creación de Options)
    $scope.opciones = [
      {code:"admin", name: "Administrador"},
      {code:"vend", name:"Vendedor" },
      {code:"compr", name:"Comprador" }
    ];

    $scope.usuario={};
    $scope.usuario.nombre = "natalia";
    $scope.usuario.email = "natalia@natalia.com";
    $scope.usuario.password = "1234";
    $scope.usuario.password2 = "1234"
    $scope.usuario.tipo = "";

    $scope.Guardar=function(){
      
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