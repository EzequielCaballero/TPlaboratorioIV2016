angular.module('ABMangularAPI.factoryOrigenDatosUsers', [])
  app.factory('factoryRutaUsuarios', function ($auth) {
    var objeto = {};
    objeto.nombre = "Factory con Rutas";

     if($auth.isAuthenticated())
     {
        $sesion = $auth.getPayload();
        if($sesion.perfil = "Empleado")
          objeto.ListaUsuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/";
        else
          objeto.ListaUsuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/";
     }

    // objeto.ListaUsuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/"; // DEFINICION de función pública
    
    return objeto;
    
});//FIN DE FACTORY