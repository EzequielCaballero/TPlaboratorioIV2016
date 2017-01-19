angular.module('ABMangularAPI.controladorUsuarioGrilla', [])   
  app.controller('controlUsuarioGrilla', function($scope, $http, $state, $auth, i18nService, uiGridConstants, servicioRetornoUsuarios, NgMap) {

      if($auth.isAuthenticated())
      {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
      }
      else
      {
        $state.go("inicio");
      }

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
      servicioRetornoUsuarios.traerCiertosUsuarios($usuarioLogueado).then(function(respuesta){
        
        //Asignos funciones para cada row (control de permisos)
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
        { name: 'Ubicacion',
        cellTemplate:'<button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" ng-click="grid.appScope.mostrarMapaModal(row.entity)">Mapa</button>'
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

    $scope.mostrarMapaModal = function(rowEntity){
    $scope.ModalHeader = "Ubicación usuario";
    console.info("Amigo", rowEntity);

    var arrayUbicacion = rowEntity.coordenadas.split(/,/);
    var latitud = arrayUbicacion[0];
    var longitud = arrayUbicacion[1].replace(" ","");
    alert("UBICACION: latitud: "+latitud+" longitud: "+longitud);

    NgMap.getMap("miMapaModal").then(function(map) {
      /*console.log(map.getCenter());
      console.log(map);
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);*/
      var myLatLng = {lat: Number(latitud), lng: Number(longitud)};
      //elimino el marker anterior del mapa
      $scope.marker.setMap(null);

      $scope.marker = new google.maps.Marker({
        position: myLatLng,
        icon: rowEntity.avatar,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: rowEntity.nombre,
        label: rowEntity.nombre
      });

      $scope.marker.setMap(map);

        $("#myModal").on("shown.bs.modal", function(e) {
        google.maps.event.trigger(map, "resize");
         map.setCenter(myLatLng);// Set here center map coordinates
         map.setZoom(6);
        });

      });

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