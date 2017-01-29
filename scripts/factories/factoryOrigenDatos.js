angular.module('ABMangularAPI.factoryOrigenDatos', [])
  app.factory('factoryRutaDatos', function ($auth) {
    var objeto = {};
    objeto.nombre = "Factory con Rutas";
    objeto.Usuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/"; // ORIGEN datos = Usuarios
    objeto.Locales = "http://localhost/1A-TP_PIZZERIA/WEBService/locales/"; // ORIGEN datos = Locales
    objeto.Ofertas = "http://localhost/1A-TP_PIZZERIA/WEBService/ofertas/"; // ORIGEN datos = Ofertas
    
    return objeto;
    
});//FIN DE FACTORY