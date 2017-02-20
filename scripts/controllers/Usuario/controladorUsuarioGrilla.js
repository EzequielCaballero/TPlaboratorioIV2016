angular.module('ABMangularAPI.controladorUsuarioGrilla', [])   
  app.controller('controlUsuarioGrilla', function($scope, $http, $state, $auth, i18nService, uiGridConstants, servicioRetornoUsuarios, NgMap) {

      if(!$auth.isAuthenticated())
        $state.go("inicio");
      else
      {
          $sesion = $auth.getPayload();
          $usuarioLogueado = $sesion.perfil;
      }

      //DEFINIR LOADING
      $scope.verUsuarios = false;
      $scope.loadingData = true;

      $scope.marker = new MarkerWithLabel();
      //ARRAY DE MARKERS
      //$scope.markersArray = [];

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
        //DESACTIVAR LOADING
        $scope.verUsuarios = true;
        $scope.loadingData = false;
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
          cellTemplate:'<button type="button" class="btn btn-info" data-toggle="modal" data-target="#usuarioSeleccionado" ng-click="grid.appScope.mostrarMapa(row.entity)">Mapa</button>',
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
          cellTemplate:'<button class="btn btn-danger" data-toggle="modal" data-target="#confirmarBorrar" ng-click="grid.appScope.definirQueBorrar(row.entity.id_usuario)"><span class="glyphicon glyphicon-remove-circle">&nbsp;</span>Borrar</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false,
          visible: true
        },
      ];
    }

    //FUNCION MOSTRAR MAPA
    $scope.mostrarMapa = function(rowEntity){
      console.info("Usuario", rowEntity);

      //Definición tamaño de icono 
      var marcador = {
          url: "img/GoogleMaps/marker_1.png", // url
          scaledSize: new google.maps.Size(40, 40), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
      };

      NgMap.getMap("mapa_usuario").then(function(map) {

           //GEODECODER AND MODAL WINDOW
           var geocoder = new google.maps.Geocoder();
           console.info("Geodecoder inicial: ", geocoder);
           //elimino el marker anterior del mapa
           $scope.marker.setMap(null);
           $scope.ubicacion = rowEntity.direccion;
           $scope.usuario = rowEntity.apellido+", "+rowEntity.nombre;
           
           if (geocoder) {
                geocoder.geocode( { 'address': rowEntity.direccion}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    google.maps.event.trigger(map, "resize");
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);
                    console.info("Geodecoder: ", results);

                    $scope.location = results[0].geometry.location;

                    $scope.marker = new MarkerWithLabel({
                        position: results[0].geometry.location,
                        icon: marcador,
                        draggable: false,
                        //animation: google.maps.Animation.DROP,
                        title: "Usuario",
                        labelContent: $scope.usuario, //Etiqueta agregada para el marker.
                        labelClass:"etiquetaMapa", // define la clase a la que pertence el label a fin de fijar su estilo en CSS.
                        labelAnchor: new google.maps.Point(22, 0),
                        labelStyle: {opacity: 0.75}
                    });
                    $scope.marker.setMap(map);

                  } else {
                     console.info("Sin resultados");
                  }
                } else {
                   console.info("Geocode was not successful for the following reason: ", status);
                }
              });//FIN funcion geodecoder
            }//FIN if geodecoder

            $("#usuarioSeleccionado").on("shown.bs.modal", function(e) {
           //map.setCenter(myLatLng);// Set here center map coordinates
                google.maps.event.trigger(map, "resize");
                map.setCenter($scope.location);
                map.setZoom(15);

            });//FIN ventana modal
        });//FIN NgMAP
      
      //FIN FUNCION MOSTRAR MAPA 
     }

    $scope.definirQueBorrar = function(usuario){
      $scope.usuarioAeliminar = usuario;
    }

    $scope.confirmarBorrado = function(){

      var passIngresado = $("#ingresoPass").val();
      if(passIngresado == "utn_1234")
      {
        $scope.passErroneo = false;
        $scope.Borrar($scope.usuarioAeliminar);
      }
      else
        $scope.passErroneo = true;
    } 

    $scope.Borrar = function(usuario){

      servicioRetornoUsuarios.ABM_Usuario(usuario, "Borrar").then(function(response){
        console.log("RETORNO: ", response.data);
        $('#confirmarBorrar').modal("hide");  
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

    $scope.reiniciarMapa = function(){
      //setTimeout(function(){ location.reload(); }, 100);
    }

  });