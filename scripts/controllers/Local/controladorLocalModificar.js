angular.module('ABMangularAPI.controladorEntidadModificar', [])    
  app.controller('controlEntidadModificar', function($scope, $http, $state, $stateParams, FileUploader) {

    $scope.votante={};
    $scope.DatoTest="***MODIFICAR***";
    $scope.soloLectura = true;

    //console.log($stateParams);//$scope.votante=$stateParams;
    $scope.votante.dni= parseInt($stateParams.dni);
    $scope.votante.sexo=$stateParams.sexo;
    //Se añade un día a la fecha que retorna de la BD.
    $scope.votante.fecha= new Date($stateParams.fecha);
    $scope.votante.fecha.setDate($scope.votante.fecha.getDate()+1);

    $scope.votante.partido=$stateParams.partido;
    $scope.votante.foto=$stateParams.foto;

    $scope.uploader=new FileUploader({url:'http://localhost/1-parcialAngularAPI_SLIM/ws1/altaFoto/'});
    //console.log($scope.votante);

    $scope.actualizarFoto =function(votante)
      {
        //Lógica empleada para actualizar la foto luego de modificar
        var ruta = "img/"+votante.foto;
        var rutaNew = ruta + "?random="+new Date().getTime();
        return rutaNew;
      }

    $scope.uploader.onSuccessItem=function(item, response, status, headers)
    {
        $http.put('http://localhost/1-parcialAngularAPI_SLIM/ws1/personas/' + JSON.stringify($scope.votante))
        .then(function(respuesta) {
         console.log("RETORNO: ", respuesta.data);
         $state.go("votante.grilla");

        },function errorCallback(response) {
          console.log("FALLO! ", response);
        });
        console.info("Ya guardé el archivo.", item, response, status, headers);
    };


    $scope.Guardar=function(){
    console.log($scope.uploader.queue);
      if($scope.uploader.queue[0]!=undefined)
      {
        var nombreFoto = $scope.uploader.queue[0]._file.name;
        $scope.votante.foto=nombreFoto;
      }

      $scope.uploader.uploadAll();
      console.log("objeto a modificar:");
      console.log($scope.votante);
    }

  });