angular.module('ABMangularAPI.controladorLocalOpciones', [])  
  app.controller('controlLocalOpciones', function($scope, $http, $state, $auth, $stateParams, servicioRetornoOfertas, servicioRetornoProductos) {

    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
      $state.go("inicio");

    if($stateParams.obj == null)
      $state.go("cliente.inicio");
    else
    {
        $scope.local = $stateParams.obj;
        console.info("Parametro datos: ", $stateParams);
        $scope.direccionLocal = $scope.local.direccion;
        console.info("Local traido: ", $scope.local);

        $scope.disabledProductos = false;
        $scope.disabledOfertas = false;

        //TRAER OFERTAS
        servicioRetornoOfertas.traerTodo().then(function(respuesta){
          $scope.lista_ofertas = respuesta.data;
          console.info("Opciones de ofertas:", $scope.lista_ofertas);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
        });

        //TRAER PRODUCTOS
        servicioRetornoProductos.traerTodo().then(function(respuesta){
          $scope.lista_productos = respuesta.data;
          console.info("Opciones de productos:", $scope.lista_productos);

          },function errorCallback(response) {
                console.log("FALLO! ", response);
        });

        $scope.visualizar = function(accion){
          switch(accion)
          {
            case "Productos":
              $scope.verProductos = true;
              $scope.verOfertas = false;
              $scope.disabledProductos = true;
              $scope.disabledOfertas = false;
              break;
            case "Ofertas":
              $scope.verProductos = false;
              $scope.verOfertas = true;
              $scope.disabledProductos = false;
              $scope.disabledOfertas = true;
              break;
          }
        }

        $scope.cerrarSesion = function(){
            $auth.logout();
            $state.go("inicio");
        }

    }//FIN DE LA CONDICION ELSE
});