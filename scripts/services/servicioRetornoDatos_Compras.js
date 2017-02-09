angular.module('ABMangularAPI.servicioRetornoDatos_Compras', [])
  app.service('servicioRetornoCompras', function ($http, factoryRutaDatos) {
    this.Nombre="service para Compras";

    //****************************ORIGEN DE DATOS****************************//
    // Uso dinámico de valor url (por Factory)
    var Url = factoryRutaDatos.Compras;

    //****************************FUNCIONES****************************//
    this.retornarOrigenDatos = function(){
      return Url;
    }


    this.traerTodo = function(){ //FUNCIÓN PÚBLICA
       return $http.get(Url).then(
          //Funciones que son parámetros, con lo cual se separan por coma.
          function(respuesta){
            console.info("RESPUESTA (en service): ", respuesta);
            return respuesta;
          },
          function(error){
            console.info("ERROR!", error);
            return error;
          }
        );
    }

    this.traerCiertasCompras = function(parametro){ //FUNCIÓN PÚBLICA

        return $http.get(traerURL(parametro)).then(
          //Funciones que son parámetros, con lo cual se separan por coma.
          function(respuesta){
            console.info("RESPUESTA (en service): ", respuesta);
            return respuesta;
          },
          function(error){
            console.info("ERROR!", error);
            return error;
          }
        );
      }
       

    function traerURL(Parametro){ //FUNCIÓN PRIVADA: tipo "get" atributo.
      if(!Parametro)
        return Url;
      else
        return Url + JSON.stringify(Parametro);
    }

    //************************** ALTA - BAJA - MODIFICACION **************************//

    this.ABM_Compra = function(compra, accion){ //FUNCIÓN PÚBLICA
      
      switch(accion)
      { 
        case "Agregar": //POST
          return $http.post(traerURL(compra)).then(
              //Funciones que son parámetros, con lo cual se separan por coma.
              function(respuesta){
                console.info("RESPUESTA (en service): ", respuesta);
                return respuesta;
              },
              function(error){
                console.info("ERROR!", error);
                return error;
              }
            );

        case "Modificar": //PUT

           return $http.put(traerURL(compra)).then(
              //Funciones que son parámetros, con lo cual se separan por coma.
              function(respuesta){
                console.info("RESPUESTA (en service): ", respuesta);
                return respuesta;
              },
              function(error){
                console.info("ERROR! (en service)", error);
                return error;
              }
            );

        case "Borrar": // DELETE

          return $http.delete(traerURL(compra)).then(
              //Funciones que son parámetros, con lo cual se separan por coma.
              function(respuesta){
                console.info("RESPUESTA (en service): ", respuesta);
                return respuesta;
              },
              function(error){
                console.info("ERROR!", error);
                return error;
              }
            );
      }
    }
      
})//FIN DE SERVICIO