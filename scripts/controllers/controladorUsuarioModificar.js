angular.module('ABMangularAPI.controladorUsuarioModificar', [])  
  app.controller('controlUsuarioModificar', function($scope, $http, $state, $stateParams, servicioRetornoUsuarios) {

    $scope.usuario={};
    $scope.DatoRegistro="***MODIFICAR USUARIO***";
    $scope.DatoSubmit = "Modificar";
    //$scope.soloLectura = true;

    //console.log($stateParams);//$scope.usuario=$stateParams;
    $scope.usuario.id = $stateParams.id;
    $scope.usuario.nombre = $stateParams.nombre;
    $scope.usuario.email = $stateParams.email;
    $scope.usuario.email = $stateParams.email;
    $scope.usuario.password = $stateParams.pass;
    $scope.usuario.password2 = $stateParams.pass;
    //Se añade un día a la fecha que retorna de la BD.
    $scope.opciones = [
      {code:"admin", name: "Administrador"},
      {code:"vend", name:"Vendedor" },
      {code:"compr", name:"Comprador" }
    ];

    $scope.usuario.tipo = $stateParams.tipo;

    //console.info("Usuario a modificar", $scope.usuario);

    $scope.Guardar=function(){

      servicioRetornoUsuarios.ABM_Usuario($scope.usuario, "Modificar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
          $state.go("usuario.grilla");
          console.info(respuesta.data);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
      });
    }
    
    // $scope.Guardar=function(){
    //   console.info("objeto a modificar: ", $scope.usuario);
    //   $http.put('http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/' + JSON.stringify($scope.usuario))
    //     .then(function(respuesta) {
    //      console.log("RETORNO: ", respuesta.data);
    //      $state.go("usuario.grilla");

    //     },function errorCallback(response) {
    //       console.log("FALLO! ", response);
    //     });
    // }

  });