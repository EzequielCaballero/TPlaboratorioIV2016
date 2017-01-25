angular.module('ABMangularAPI.factoryOrigenDatos', [])
  app.factory('factoryRutaDatos', function ($auth) {
    var objeto = {};
    objeto.nombre = "Factory con Rutas";
    objeto.Usuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/"; // ORIGEN datos de usuarios
    objeto.Locales = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/"; // ORIGEN datos de usuarios
    
    return objeto;
    
});//FIN DE FACTORY