angular.module('ABMangularAPI.controladorLocalGrilla', [])   
  app.controller('controlLocalGrilla', function($scope, $http, $state, $auth, i18nService, uiGridConstants, servicioRetornoLocales, servicioRetornoUsuarios, NgMap) {

      if(!$auth.isAuthenticated())
        $state.go("inicio");
      else
      {
          $sesion = $auth.getPayload();
          $usuarioLogueado = $sesion.perfil;
      }

      $scope.marker = new google.maps.Marker({
        title: 'default'
      });
      $scope.markersArray = [];

      $scope.tituloGrillaLocales = "GRILLA LOCALES";
      // Objeto de configuracion de la grilla Usuarios.
      $scope.gridOptionsLocales = {};
      $scope.gridOptionsLocales.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsLocales.paginationPageSize = 25;
      $scope.gridOptionsLocales.columnDefs = columnDefsLocales();
      $scope.gridOptionsLocales.rowHeight = 70;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsLocales.enableFiltering = true;
      $scope.gridOptionsLocales.enableHiding = true;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      //UTILIZACIÓN DEL SERVICE
      servicioRetornoLocales.traerTodo().then(function(respuesta){        
        // Cargo los datos en la grilla.
        $scope.gridOptionsLocales.data = respuesta.data;
        console.info(respuesta.data);
      });

      function columnDefsLocales () {
      return [
        { field: 'id_local', displayName: 'Local',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'direccion', name: 'Direccion',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'coordenadas', name: 'Coordenadas',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'id_encargado', name: 'Encargado',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'foto1', name: 'foto1',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { field: 'foto2', name: 'foto2',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { field: 'foto3', name: 'foto3',
          enableHiding: false,
          enableFiltering: false
        },
        { name: 'Ubicacion',
          cellTemplate:'<button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.mostrarMapa(row.entity)">Mapa</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { name: 'Modificar',
          cellTemplate:'<button class="btn btn-warning" name="Perfil" ui-sref="local.perfil({id:row.entity.id_usuario})"><span class="glyphicon glyphicon-edit">&nbsp;</span>Ver</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false,
          visible: true
        },
        { name: 'Borrar',
          cellTemplate:'<button class="btn btn-danger" ng-click="grid.appScope.Borrar(row.entity)"><span class="glyphicon glyphicon-remove-circle">&nbsp;</span>Borrar</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false,
          visible: true
        }
      ];
    }

    $scope.mostrarMapa = function(rowEntity){
    $scope.ModalHeader = "Ubicación local";
    console.info("local", rowEntity);

    var arrayUbicacion = rowEntity.coordenadas.split(/,/);
    var latitud = arrayUbicacion[0];
    var longitud = arrayUbicacion[1].replace(" ","");
    //alert("UBICACION: latitud: "+latitud+" longitud: "+longitud);

      NgMap.getMap("miMapaModal").then(function(map) {
      $scope.marker.setMap(null);
      $scope.ubicacion = rowEntity.direccion;
      console.log('ubicacion', $scope.ubicacion);

      $scope.marker.setMap(map);
      $scope.direccionEnMapa = "DIRECCIÓN: " + rowEntity.direccion;
        // $("#myModal").on("shown.bs.modal", function(e) {
        // google.maps.event.trigger(map, "resize");
        //  map.setCenter(myLatLng);// Set here center map coordinates
        //  map.setZoom(6);
        // });
    
      });
    }

    $scope.Borrar = function(local){

      servicioRetornoUsuarios.ABM_Usuario(local.id_local, "Borrar").then(function(response){
        console.log("RETORNO: ", response.data);

          // Vuelvo a cargar los datos en la grilla.
          servicioRetornoLocales.traerTodo().then(function(respuesta){
          $scope.gridOptionsLocales.data = respuesta.data;
          console.info(respuesta.data);

        },function errorCallback(response) {
              $scope.gridOptionsLocales.data = [];
              console.log("FALLO! ", response);
        });
      });
    }

  });