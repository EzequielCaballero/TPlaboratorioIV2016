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

      if($usuarioLogueado != "Administrador")
      {
        $scope.gridOptionsLocales.columnDefs.splice($scope.gridOptionsLocales.columnDefs.length-1, 1);
      }

      var contador = 0;
      //UTILIZACIÓN DEL SERVICE
      servicioRetornoLocales.traerTodo().then(function(respuesta){        
        //Asignos funciones para cada row (control de permisos)
        angular.forEach(respuesta.data,function(row){
          contador++;
          var nombreLocal = "Local N°" + contador;
          row.LocalName = function(){
            return nombreLocal;
          }
      });

        // Cargo los datos en la grilla.
        $scope.gridOptionsLocales.data = respuesta.data;
        console.info(respuesta.data);
      });

      function columnDefsLocales () {
      return [
        { field: 'LocalName()', displayName: 'Local',
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
        { field: 'encargado', name: 'Encargado',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'foto1', name: 'Fotos',
          cellTemplate:'<button class="btn btn-block" data-toggle="modal" data-target="#galeriaFotos" ng-click="grid.appScope.imagenLocales(row.entity)"><img class="img-rounded"ng-src="img/Locales/{{grid.getCellValue(row, col)}}" height=60 width=70</img></button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { name: 'Ubicacion',
          cellTemplate:'<button class="btn btn-info" ng-click="grid.appScope.mostrarMapa(row.entity)">Mapa</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
        { name: 'Detalle',
          cellTemplate:'<button class="btn btn-warning" name="Perfil" ui-sref="local.perfil({id:row.entity.id_local})"><span class="glyphicon glyphicon-edit">&nbsp;</span>Ver</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false,
          visible: true
        },
        { field:'borrar', name: '',
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

      NgMap.getMap("miMapaModal").then(function(map) {
      $scope.marker.setMap(null);
      $scope.ubicacion = rowEntity.direccion;
      console.log('ubicacion', $scope.ubicacion);

      $scope.marker.setMap(map);
      $scope.direccionEnMapa = "DIRECCIÓN: " + rowEntity.direccion;
      $scope.encargadoLocal = "Encargado: " + rowEntity.encargado;

    
      });
    }

    $scope.Borrar = function(local){
      console.info("Local: ", local);
      servicioRetornoLocales.ABM_Local(local.id_local, "Borrar").then(function(response){
        console.log("RETORNO: ", response.data);

          // Vuelvo a cargar los datos en la grilla.
          servicioRetornoLocales.traerTodo().then(function(respuesta){        
            //Asignos funciones para cada row (control de permisos)
            angular.forEach(respuesta.data,function(row){
              contador++;
              var local = "Local N°" + contador;
              row.LocalName = function(){
                return local;
            }
          });
          // Cargo los datos en la grilla.
          $scope.gridOptionsLocales.data = respuesta.data;
          console.info(respuesta.data);

        },function errorCallback(response) {
              $scope.gridOptionsLocales.data = [];
              console.log("FALLO! ", response);
        });
      });
    }

    $scope.imagenLocales = function(local){
      
      var slideIndex = 1;
      var tiempo; 

      function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        if (n > x.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
           dots[i].className = dots[i].className.replace(" w3-white", "");
        }
        x[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " w3-white";
        //tiempo = setTimeout(carousel, 5000); // Change image every 5 seconds
      }

      // function carousel() {
      //   var i;
      //   var x = document.getElementsByClassName("mySlides");


      //   for (i = 0; i < x.length; i++) {
      //      x[i].style.display = "none";  
      //   }
      //   slideIndex++;
      //   if (slideIndex > x.length) {slideIndex = 1}    
      //   x[slideIndex-1].style.display = "block";

      //   $scope.currentDiv(slideIndex);
      // }

      $scope.plusDivs = function(n) {
        showDivs(slideIndex += n);
      }

      $scope.currentDiv = function(n) {
        showDivs(slideIndex = n);
      }

      //clearTimeout(tiempo);
      showDivs(slideIndex);

      $scope.tituloGaleria = local.LocalName() + "- Galeria";
      console.info("Titulo", $scope.tituloGaleria);
      $scope.fotoLocal_1 = "img/Locales/" + local.foto1;
      $scope.fotoLocal_2 = "img/Locales/" + local.foto2;
      $scope.fotoLocal_3 = "img/Locales/" + local.foto3;
      console.info("Local info: ", local);
    }

  });