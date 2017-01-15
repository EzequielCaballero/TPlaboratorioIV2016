angular.module('ABMangularAPI.controladorUsuarioGrilla', [])   
  app.controller('controlUsuarioGrilla', function($scope, $http, $state, i18nService, uiGridConstants) {

      $scope.tituloGrillaPersonas = "Grilla Personas";
      // Objeto de configuracion de la grilla Personas.
      $scope.gridOptionsPersonas = {};
      $scope.gridOptionsPersonas.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsPersonas.paginationPageSize = 25;
      $scope.gridOptionsPersonas.columnDefs = columnDefsPersonas();
      $scope.gridOptionsPersonas.rowHeight = 70;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsPersonas.enableFiltering = false;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      $http.get('http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/')
      .then(function(respuesta) {

         $scope.gridOptionsPersonas.data = respuesta.data;
         $scope.ListadoUsuarios = respuesta.data;
         console.log("RETORNA", respuesta.data);

      },function errorCallback(response) {
         $scope.gridOptionsPersonas.data = [];
         $scope.ListadoUsuarios = [];
          console.log( "FALLO!", response);
      });

      function columnDefsPersonas () {
      return [
        { field: 'nombre', name: 'Usuario'},
        { field: 'email', name: 'Correo'},
        { field: 'tipo', name: 'Perfil'},
        { name: 'Borrar',
          cellTemplate:'<button class="btn btn-danger" ng-click="Borrar(row.entity)"><span class="glyphicon glyphicon-remove-circle">&nbsp;</span>Borrar</button>'
        },
        { name: 'Modificar',
          cellTemplate:'<button class="btn btn-warning" name="Modificar" ui-sref="usuario.modificar({id:usuario.id, nombre:usuario.nombre, email:usuario.email, tipo:usuario.tipo, pass:usuario.password})"><span class="glyphicon glyphicon-edit">&nbsp;</span>Modificar</button>'
        }
      ];
    }

      $scope.Borrar = function(usuario)
      {
          alert("HOLA!");
          console.log("borrar: " + usuario);

          $http.delete('http://localhost/2-segundoParcial_API_SFD/WEBService/usuarios/' + JSON.stringify(usuario.id))
          .then(function(respuesta) {
             //aca se ejetuca si retorno sin errores
             console.log(respuesta.data);
             $http.get('http://localhost/2-segundoParcial_API_SFD/WEBService/usuarios/')
            .then(function(respuesta) {

               $scope.gridOptionsPersonas.data = respuesta.data;
               console.log("RETORNA", respuesta.data);

            },function errorCallback(response) {
                 $scope.gridOptionsPersonas.data = [];
                console.log("FALLO!", response);
            });
          });
      }

  });