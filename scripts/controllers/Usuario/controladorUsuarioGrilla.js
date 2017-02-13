angular.module('ABMangularAPI.controladorUsuarioGrilla', [])   
  app.controller('controlUsuarioGrilla', function($scope, $http, $state, $auth, i18nService, uiGridConstants, servicioRetornoUsuarios, NgMap) {

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

      $scope.tituloGrillaUsuarios = "GRILLA USUARIOS";
      // Objeto de configuracion de la grilla Usuarios.
      $scope.gridOptionsUsuarios = {
               // Configuracion para exportar datos.
            exporterCsvFilename: 'tablaUsuarios.csv',
            exporterCsvColumnSeparator: ';',
            exporterPdfDefaultStyle: {fontSize: 8},
            exporterPdfTableStyle: {margin: [5, 5, 5, 5]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
              return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function ( docDefinition ) {
              docDefinition.styles.headerStyle = { fontSize: 10, bold: true };
              docDefinition.styles.footerStyle = { fontSize: 5, bold: true };
              return docDefinition;
            },
            exporterPdfOrientation: 'landscape',
            exporterPdfPageSize: 'A4',
            exporterPdfMaxGridWidth: 900,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function(gridApi){
              $scope.gridApi = gridApi;
            }
      };
      $scope.gridOptionsUsuarios.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsUsuarios.paginationPageSize = 25;
      $scope.gridOptionsUsuarios.columnDefs = columnDefsUsuarios();
      $scope.gridOptionsUsuarios.rowHeight = 70;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsUsuarios.enableFiltering = true;
      $scope.gridOptionsUsuarios.enableHiding = true;
      $scope.gridOptionsUsuarios.enableGridMenu = true;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      if($usuarioLogueado != "Administrador")
      {
        $scope.gridOptionsUsuarios.columnDefs.splice($scope.gridOptionsUsuarios.columnDefs.length-1, 1);
      }

      //UTILIZACIÓN DEL SERVICE
      servicioRetornoUsuarios.traerCiertosUsuarios($sesion).then(function(respuesta){
        // Cargo los datos en la grilla.
        $scope.gridOptionsUsuarios.data = respuesta.data;
        console.info(respuesta.data);
      });

      function columnDefsUsuarios () {
      return [
        { field: 'nombre', displayName: 'Nombre',
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
        { field: 'tipo_user', name: 'Tipo',
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
        { name: 'Ubicacion',
          cellTemplate:'<button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.mostrarMapa(row.entity)">Mapa</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { name: 'Perfil',
          cellTemplate:'<button class="btn btn-warning" name="Perfil" ui-sref="usuario.perfil({id:row.entity.id_usuario})"><span class="glyphicon glyphicon-edit">&nbsp;</span>Ver</button>',
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
        },
      ];
    }

    $scope.mostrarMapa = function(rowEntity){
    $scope.ModalHeader = "Ubicación usuario";
    console.info("Usuario", rowEntity);

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

    $scope.Borrar = function(usuario){

      servicioRetornoUsuarios.ABM_Usuario(usuario.id_usuario, "Borrar").then(function(response){
        console.log("RETORNO: ", response.data);

          // Vuelvo a cargar los datos en la grilla.
          servicioRetornoUsuarios.traerCiertosUsuarios($sesion).then(function(respuesta){
          $scope.gridOptionsUsuarios.data = respuesta.data;
          console.info(respuesta.data);

        },function errorCallback(response) {
              $scope.gridOptionsUsuarios.data = [];
              console.log("FALLO! ", response);
        });
      });
    }

  });