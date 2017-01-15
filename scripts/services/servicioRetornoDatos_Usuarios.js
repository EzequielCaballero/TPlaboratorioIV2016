angular.module('ABMangularAPI.servicioRetornoDatos_Usuario', [])
  app.service('servicioRetornoUsuarios', function ($http, factoryRutaUsuarios) {
    this.Nombre="service para Usuarios";

    //****************************ORIGEN DE DATOS****************************//
    // Uso dinámico de valor url (por Factory)
    var Url = factoryRutaUsuarios.ListaUsuarios;

    //****************************FUNCIONES****************************//

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


    function traerURL(Parametro){ //FUNCIÓN PRIVADA: tipo "get" atributo.
      if(!Parametro)
        return Url;
      else
        return Url + JSON.stringify(Parametro);
    }

    //************************** ALTA - BAJA - MODIFICACION **************************//

    this.ABM_Usuario = function(usuario, accion){ //FUNCIÓN PÚBLICA
      
      switch(accion)
      { 
        case "Agregar": //POST
          return $http.post(traerURL(usuario)).then(
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

           return $http.put(traerURL(usuario)).then(
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

        case "Borrar": // DELETE

          return $http.delete(traerURL(usuario)).then(
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