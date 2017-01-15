angular.module('ABMangularAPI.controladorEntidadGrilla', [])  
  app.controller('controlEntidadGrilla', function($scope, $http, $state) {

      $http.get('http://localhost/1A-TP_PIZZERIA/WEBService/entidades/')
      .then(function(respuesta) {       
        console.info("RESPUESTA", respuesta);
             $scope.ListadoEntidades = respuesta.data;
             console.log(respuesta.data);

        },function errorCallback(response) {
             $scope.ListadoEntidades= [];
            console.log(response);
            
       });

      //*********BAJA*********//
      $scope.Borrar = function(entidad)
      {
          console.log("borrar: " + entidad);

          $http.delete('http://localhost/2-segundoParcial_API_SFD/WEBService/entidades/' + JSON.stringify(entidad.numero))
          .then(function(respuesta) {
             //aca se ejetuca si retorno sin errores
             console.log(respuesta.data);
             $http.get('http://localhost/2-segundoParcial_API_SFD/WEBService/entidades/')
            .then(function(respuesta) {

               $scope.ListadoEntidades = respuesta.data;
               console.log("RETORNA", respuesta.data);

            },function errorCallback(response) {
                 $scope.ListadoEntidades= [];
                console.log("FALLO!", response);
            });
        });
      }
  });