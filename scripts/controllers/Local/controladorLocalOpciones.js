angular.module('ABMangularAPI.controladorLocalOpciones', [])  
  app.controller('controlLocalOpciones', function($scope, $http, $state, $auth, $stateParams) {

    //SI estoy en este menú quiere decir que ya hay una sesión activa, resta saber que usuario esta logueado.
    $sesion = $auth.getPayload();
    console.info("SESION ACTIVA: ", $sesion);

    if(!$auth.isAuthenticated())
    {
       $state.go("inicio");
    }

    $scope.local = $stateParams.obj;
    console.info("Parametro datos: ", $stateParams);
    $scope.direccionLocal = $scope.local.direccion;
    console.info("Local traido: ", $scope.local);

    $scope.disabledProductos = false;
    $scope.disabledOfertas = false;

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
});