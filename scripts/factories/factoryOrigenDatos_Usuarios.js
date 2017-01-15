angular.module('ABMangularAPI.factoryOrigenDatosUsers', [])
  app.factory('factoryRutaUsuarios', function () {
    var objeto = {};
    objeto.nombre = "Factory con Rutas";
    objeto.ListaUsuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/"; // DEFINICION de función pública
    return objeto;
    
});//FIN DE FACTORY