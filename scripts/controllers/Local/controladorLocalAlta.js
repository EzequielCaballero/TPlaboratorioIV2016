angular.module('ABMangularAPI.controladorLocalAlta', [])
  app.controller('controlLocalAlta', function($scope, $http, $state, $auth, FileUploader, servicioRetornoUsuarios, servicioRetornoLocales, servicioRetornoOfertas) {

    if(!$auth.isAuthenticated())
        $state.go("inicio");
    else
    {
        $sesion = $auth.getPayload();
        $usuarioLogueado = $sesion.perfil;
    }

    $scope.DatoSubmit = "Crear";
    $scope.subidorDeArchivos = new FileUploader({url:'http://localhost/1A-TP_PIZZERIA/WEBService/altaFoto/'});

    //*********************CARGA DE OPCIONES -> LISTA EMPLEADOS**********************************//
    var empleados = [];
    servicioRetornoUsuarios.traerCiertosUsuarios("solo_Empleados").then(function(respuesta){
      console.info("empleados", respuesta.data);

      //1- Rellenado de "empleados" (array de objetos)
      var cantidadDatos = respuesta.data.length;
      for (var i = 0; i < cantidadDatos; i++) {
        var nombreEmpleado = respuesta.data[i].apellido + ", " + respuesta.data[i].nombre;
        empleados[i] = {code: respuesta.data[i].id_usuario, name: nombreEmpleado };
      }
      console.info("Opciones de empleados:", empleados);

      //2- Pasaje de Array a JSON (OPCIONAL)
      empleados = JSON.stringify(empleados);
      console.info("Empleados: ", empleados);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
    });
    //3- Asignación de opciones al Select empleados.
    $scope.usuarios = empleados;

    //*********************CARGA DE OPCIONES -> OFERTAS A ELEGIR**********************************//
    var ofertas = [];
    servicioRetornoOfertas.traerTodo().then(function(respuesta){
      //Armado de lista "ofertas" (array de objetos)
      $scope.lista_ofertas = respuesta.data;
      console.info("Opciones de ofertas:", $scope.lista_ofertas);

      },function errorCallback(response) {
            console.log("FALLO! ", response);
    });
    
    /************DATOS HARD-CODEADOS**************/
    $scope.local = {};
    //Dirección
    $scope.local.id_local = 0;
    $scope.calle = "Av. Calchaqui";
    $scope.altura = 2200;
    $scope.localidad = "Quilmes";

    $scope.local.coordenadas = "0, 0";
    $scope.local.id_encargado = null;
    $scope.local.ofertas = [];

    $scope.EleccionOferta = function(ofertaElegida){

      console.info("Oferta seleccionada: ", ofertaElegida);
      var id = '#' + ofertaElegida;
        if($(id).prop('checked')){
          $scope.local.ofertas.push(ofertaElegida);  
        }
        else
        {
          $scope.local.ofertas.splice($scope.local.ofertas.indexOf(ofertaElegida),1);
        }
      console.info("Ofertas: ", $scope.local.ofertas);
    }
    //NOTA: utilización de .splice -> Parametros (1)añadir/borrar (2)elementos a añadir/borrar (3)posición afectada
    /********************************************/
    
    $scope.subidorDeArchivos.onSuccessItem=function(item, response, status, headers)
    {
        console.info("Fotos: ", $scope.subidorDeArchivos);
        console.info("Se han movido con éxito los archivos", item, response, status, headers);
    };

    $scope.crearLocal=function(){
      
      console.info($scope.subidorDeArchivos.queue);
      if($scope.subidorDeArchivos.queue[0]!=undefined && $scope.subidorDeArchivos.queue.length == 3)
      {
        var foto_1 = $scope.subidorDeArchivos.queue[0]._file.name;
        var foto_2 = $scope.subidorDeArchivos.queue[1]._file.name;
        var foto_3 = $scope.subidorDeArchivos.queue[2]._file.name;
        $scope.local.foto1 = foto_1;
        $scope.local.foto2 = foto_2;
        $scope.local.foto3 = foto_3;

        console.info("Local a guardar: ", $scope.local);

        //Validar dirección seleccionada
        if($scope.localidad != "CABA")
        $scope.local.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad+", "+"Buenos Aires";
        else
        $scope.local.direccion = $scope.calle+" "+$scope.altura+", "+$scope.localidad;

        //Ejecutar consulta SQL
        servicioRetornoLocales.ABM_Local($scope.local, "Agregar").then(function(respuesta){
          console.log("RETORNO: ", respuesta.data);
          $state.go("local.grilla");
          console.info(respuesta.data);

          },function errorCallback(response) {
            console.log("FALLO! ", response);
        });

      }
      else
      {
        confirm("Debe subir 3 imágenes para continuar");
      }
    }

});