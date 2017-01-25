angular.module('ABMangularAPI.controladorDirectivasUsuario', []) 
  app.controller('controlDirectivaGrillaUser', function($scope, i18nService, uiGridConstants, factoryConServicio_User) {
    
    $scope.tituloGrilla = "GRILLA USUARIOS (directive)";
    $scope.listadoUsuarios = [];

   factoryConServicio_User.traerTodos().then(function(respuesta){
      console.info("Retorno: ", respuesta);
      $scope.listadoUsuarios = respuesta.data;
      console.info("controllerDirectiva: ", $scope.listadoUsuarios);
    });
});
