angular.module('ABMangularAPI.controladorUsuarioGrilla', [])   
  app.controller('controlUsuarioGrilla', function($scope, $http, $state, i18nService, uiGridConstants, servicioRetornoUsuarios) {

      $scope.tituloGrillaUsuarios = "Grilla Usuarios";
      // Objeto de configuracion de la grilla Usuarios.
      $scope.gridOptionsUsuarios = {};
      $scope.gridOptionsUsuarios.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsUsuarios.paginationPageSize = 25;
      $scope.gridOptionsUsuarios.columnDefs = columnDefsUsuarios();
      $scope.gridOptionsUsuarios.rowHeight = 70;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsUsuarios.enableFiltering = true;
      $scope.gridOptionsUsuarios.enableHiding = true;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      //UTILIZACIÓN DEL SERVICE
      servicioRetornoUsuarios.traerTodo().then(function(respuesta){
        
        //Asignos funciones para cada row
        angular.forEach(respuesta.data,function(row){
          row.Nombre = function(){
            return this.nombre;
        }
        });

        // Cargo los datos en la grilla.
        $scope.gridOptionsUsuarios.data = respuesta.data;
        console.info(respuesta.data);
      });

      function columnDefsUsuarios () {
      return [
        { field: 'Nombre()', displayName: 'Nombre',
          enableFiltering: false,
          enableHiding: false,
        },
        { field: 'apellido', name: 'Apellido',
          enableFiltering: false,
          enableHiding: false,
        },
        { field: 'edad', name: 'Edad',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'sexo', name: 'Sexo',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'correo', name: 'Correo',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { field: 'direccion', name: 'Direccion',
          enableFiltering: false,
          enableSorting: false,
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
        { field: 'estado', name: 'Estado',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'id_local', name: 'Local',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { name: 'Borrar',
          cellTemplate:'<button class="btn btn-danger" ng-click="grid.appScope.Borrar(row.entity)"><span class="glyphicon glyphicon-remove-circle">&nbsp;</span>Borrar</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false,
          visible: true
        },
        { name: 'Modificar',
          cellTemplate:'<button class="btn btn-warning" name="Modificar" ui-sref="usuario.modificar({id:row.entity.id, nombre:row.entity.nombre, email:row.entity.email, tipo:row.entity.tipo, pass:row.entity.password})"><span class="glyphicon glyphicon-edit">&nbsp;</span>Modificar</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false,
          visible: true
        }
      ];
    }

      $scope.Borrar = function(usuario){

        servicioRetornoUsuarios.ABM_Usuario(usuario.id, "Borrar").then(function(response){
          console.log("RETORNO: ", response.data);

            // Vuelvo a cargar los datos en la grilla.
            servicioRetornoUsuarios.traerTodo().then(function(respuesta){
            $scope.gridOptionsUsuarios.data = respuesta.data;
            console.info(respuesta.data);

          },function errorCallback(response) {
                $scope.gridOptionsUsuarios.data = [];
                console.log("FALLO! ", response);
          });
        });
      }

  });