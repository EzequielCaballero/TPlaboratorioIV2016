angular.module('ABMangularAPI.controladorEntidadAlta', [])
  app.controller('controlEntidadAlta', function($scope, $http, $state, FileUploader) {

    $scope.opciones = [
      {code:"Rojo", name: "Rojo"},
      {code:"Azul", name:"Azul" },
      {code:"Verde", name:"Verde" },
      {code:"Negro", name:"Negro" }
    ];

    $scope.DatoTest="***ALTA***";
    $scope.soloLectura = false;
    $scope.entidad= {};
    $scope.entidad.numero = 132;
    $scope.entidad.marca = "BLU";
    $scope.entidad.fecha = new Date("2016-08-15");
    $scope.entidad.color = "";

     $scope.Guardar=function(){

        $http.post('http://localhost/1A-TP_PIZZERIA/entidades/' + JSON.stringify($scope.entidad))
        .then(function(respuesta) {
         console.log("RETORNO: ", respuesta.data);
         $state.go("entidad.grilla");

        },function errorCallback(response) {
          console.log("FALLO! ", response);
          console.info("Datos", response);
        });
     }

  });