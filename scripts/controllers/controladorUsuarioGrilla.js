angular.module('ABMangularAPI.controladorUsuarioGrilla', [])   
  app.controller('controlUsuarioGrilla', function($scope, $http, $state, i18nService, uiGridConstants, servicioRetornoUsuarios) {

      $scope.tituloGrillaPersonas = "Grilla Personas";
      // Objeto de configuracion de la grilla Personas.
      $scope.gridOptionsPersonas = {};
      $scope.gridOptionsPersonas.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsPersonas.paginationPageSize = 25;
      $scope.gridOptionsPersonas.columnDefs = columnDefsPersonas();
      $scope.gridOptionsPersonas.rowHeight = 70;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsPersonas.enableFiltering = true;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      //UTILIZACIÓN DEL SERVICE
      servicioRetornoUsuarios.traerTodo().then(function(respuesta){
        // Cargo los datos en la grilla.
        $scope.gridOptionsPersonas.data = respuesta.data;
        console.info(respuesta.data);
      });

      function columnDefsPersonas () {
      return [
        { field: 'nombre', name: 'Nombre',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'email', name: 'Correo',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'tipo_user', name: 'Perfil',
          enableHiding: false,
          enableFiltering: true
          // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: 'administrador', label: 'Administrador'},
              {value: 'encargado', label: 'Encargado'},
              {value: 'empleado', label: 'Empleado'},
              {value: 'cliente', label: 'Cliente'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'tipo'
        },
        { name: 'Borrar',
          cellTemplate:'<button class="btn btn-danger" ng-click="grid.appScope.Borrar(row.entity)"><span class="glyphicon glyphicon-remove-circle">&nbsp;</span>Borrar</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { name: 'Modificar',
          cellTemplate:'<button class="btn btn-warning" name="Modificar" ui-sref="usuario.modificar({id:row.entity.id, nombre:row.entity.nombre, email:row.entity.email, tipo:row.entity.tipo, pass:row.entity.password})"><span class="glyphicon glyphicon-edit">&nbsp;</span>Modificar</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        }
      ];
    }

      $scope.Borrar = function(usuario){

        servicioRetornoUsuarios.ABM_Usuario(usuario.id, "Borrar").then(function(response){
          console.log("RETORNO: ", response.data);

            // Vuelvo a cargar los datos en la grilla.
            servicioRetornoUsuarios.traerTodo().then(function(respuesta){
            $scope.gridOptionsPersonas.data = respuesta.data;
            console.info(respuesta.data);

          },function errorCallback(response) {
                $scope.gridOptionsPersonas.data = [];
                console.log("FALLO! ", response);
          });
        });
      }

      // $scope.Borrar = function(usuario)
      // {
      //     console.log("borrar: " + usuario);

      //     $http.delete('http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/' + JSON.stringify(usuario.id))
      //     .then(function(respuesta) {
      //        //aca se ejecuta si retorno sin errores
      //        console.log(respuesta.data);
      //        $http.get('http://localhost/2-segundoParcial_API_SFD/WEBService/usuarios/')
      //       .then(function(respuesta) {

      //          $scope.gridOptionsPersonas.data = respuesta.data;
      //          console.log("RETORNA", respuesta.data);

      //       },function errorCallback(response) {
      //            $scope.gridOptionsPersonas.data = [];
      //           console.log("FALLO!", response);
      //       });
      //     });
      // }

  });