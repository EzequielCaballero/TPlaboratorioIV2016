angular.module('ABMangularAPI.controladorLocalOfertas', [])   
  app.controller('controlLocalOfertas', function($scope, $http, $state, $auth, i18nService, uiGridConstants, servicioRetornoOfertas, servicioRetornoProductos) {

      if(!$auth.isAuthenticated())
        $state.go("inicio");
      else
      {
          $sesion = $auth.getPayload();
          $usuarioLogueado = $sesion.perfil;
      }

      //DEFINIR LOADING
      $scope.verOfertas = false;
      $scope.loadingData = true;

      $scope.tituloGrillaProductos = "GRILLA OFERTAS";
      // Objeto de configuracion de la grilla Usuarios.
      $scope.gridOptionsOfertas = {
               // Configuracion para exportar datos.
            exporterCsvFilename: 'tablaOfertas.csv',
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
      $scope.gridOptionsOfertas.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsOfertas.paginationPageSize = 25;
      $scope.gridOptionsOfertas.columnDefs = columnDefsProductos();
      $scope.gridOptionsOfertas.rowHeight = 40;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsOfertas.enableFiltering = true;
      $scope.gridOptionsOfertas.enableHiding = true;
      $scope.gridOptionsOfertas.enableGridMenu = true;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      //TRAER OFERTAS GLOBALES
      servicioRetornoOfertas.traerTodo().then(function(respuesta){
        // Cargo los datos en la grilla.
        $scope.gridOptionsOfertas.data = respuesta.data;
        console.info("ofertas: ", respuesta.data);
        //DESACTIVAR LOADING
        $scope.verOfertas = true;
        $scope.loadingData = false;

        },function errorCallback(response) {
              console.log("FALLO al traer ofertas! ", response);
      });

      function columnDefsProductos () {
      return [
        { field: 'id_oferta', displayName: 'CODIGO',
          enableFiltering: false,
          enableHiding: false,
        },
        { field: 'titulo', name: 'Nombre',
          enableFiltering: false,
          enableHiding: false,
        },
        { field: 'cant_productos', name: 'Productos',
          enableFiltering: false,
          enableHiding: false
        },
        { field: 'precio', name: 'Precio',
          cellTemplate:"<p>${{grid.getCellValue(row, col)}}</p>",
          enableFiltering: false,
          enableHiding: false
        },
        { name: 'Detalle',
          cellTemplate:'<button class="btn btn-success btn-block" data-toggle="modal" data-target="#verOfertasModal" ng-click="grid.appScope.verProductosDeOferta(row.entity.id_oferta)">Ver productos</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
      ];
      }

      //TRAER PRODUCTOS DE OFERTAS DE LOCAL
      $scope.verProductosDeOferta = function(oferta){

        servicioRetornoProductos.traerCiertosProductos(oferta).then(function(respuesta){
        $scope.lista_productos_oferta = respuesta.data;
        console.info("Productos asociados a oferta:", respuesta.data);

        $scope.imagenProductos($scope.lista_productos_oferta, 'oferta');

        },function errorCallback(response) {
              console.log("FALLO! al traer productos de la oferta: ", response);
        });
      }

      $scope.imagenProductos = function(producto){
        var slideIndex = 1;

        function mostrarFoto(n) {
          var i;
          var x = document.getElementsByClassName("mySlides");
          var dots = document.getElementsByClassName("demo");
          if (n > x.length) {slideIndex = 1}    
          if (n < 1) {slideIndex = x.length}
          for (i = 0; i < x.length; i++) {
             x[i].style.display = "none";  
          }
          x[slideIndex-1].style.display = "block";

          var productName = document.getElementsByClassName("productoEnvista");
          if(productName.length != 0)
          { 
            for (var i = 0; i < productName.length; i++) {
              productName[i].style.backgroundColor = "white";
            }
            productName[slideIndex-1].style.backgroundColor = "#EABF64";
          }  
        }

        $scope.moverFoto = function(n) {
          mostrarFoto(slideIndex = parseInt(slideIndex) + parseInt(n));
        }

        $scope.elegirFoto = function(n) {
          mostrarFoto(slideIndex = n);
        }

        $scope.tituloGaleria = producto.nombre;
        console.info("Titulo", $scope.tituloGaleria);
        $scope.fotoProducto_1 = producto.foto1;
        $scope.fotoProducto_2 = producto.foto2;
        $scope.fotoProducto_3 = producto.foto3;
        console.info("Producto info: ", producto);

        setTimeout(function(){ mostrarFoto(slideIndex); }, 300);

      }//FIN de función imagenProductos


// FIN CONTROL GRILLA PRODUCTOS
});