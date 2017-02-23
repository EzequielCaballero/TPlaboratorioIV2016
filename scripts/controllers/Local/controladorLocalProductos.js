angular.module('ABMangularAPI.controladorLocalProductos', [])   
  app.controller('controlLocalProductos', function($scope, $http, $state, $auth, i18nService, uiGridConstants, servicioRetornoProductos) {

      if(!$auth.isAuthenticated())
        $state.go("inicio");
      else
      {
          $sesion = $auth.getPayload();
          $usuarioLogueado = $sesion.perfil;
      }

      //DEFINIR LOADING
      $scope.verProductos = false;
      $scope.loadingData = true;

      $scope.tituloGrillaProductos = "GRILLA PRODUCTOS";
      // Objeto de configuracion de la grilla Usuarios.
      $scope.gridOptionsProductos = {
               // Configuracion para exportar datos.
            exporterCsvFilename: 'tablaProductos.csv',
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
      $scope.gridOptionsProductos.paginationPageSizes = [25, 50, 75];
      // Configuracion de la paginacion
      $scope.gridOptionsProductos.paginationPageSize = 25;
      $scope.gridOptionsProductos.columnDefs = columnDefsProductos();
      $scope.gridOptionsProductos.rowHeight = 40;
      // Activo la busqueda en todos los campos.
      $scope.gridOptionsProductos.enableFiltering = true;
      $scope.gridOptionsProductos.enableHiding = true;
      $scope.gridOptionsProductos.enableGridMenu = true;
      // Configuracion del idioma.
      i18nService.setCurrentLang('es');

      //UTILIZACIÓN DEL SERVICE
      servicioRetornoProductos.traerTodo().then(function(respuesta){
        // Cargo los datos en la grilla.
        $scope.gridOptionsProductos.data = respuesta.data;
        //DESACTIVAR LOADING
        $scope.verProductos = true;
        $scope.loadingData = false;
        console.info(respuesta.data);
      });

      function columnDefsProductos () {
      return [
        { field: 'id_producto', displayName: 'CODIGO',
          enableFiltering: false,
          enableHiding: false,
        },
        { field: 'nombre', name: 'Nombre',
          enableFiltering: false,
          enableHiding: false,
        },
        { field: 'precio', name: 'Precio',
          cellTemplate:"<p>${{grid.getCellValue(row, col)}}</p>",
          enableFiltering: false,
          enableHiding: false
        },
        { name: 'Fotos',
          cellTemplate:'<button class="btn btn-success btn-block" data-toggle="modal" data-target="#verProductos" ng-click="grid.appScope.imagenProductos(row.entity)">Ver imágenes</button>',
          enableFiltering: false,
          enableSorting: false,
          enableHiding: false
        },
      ];
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