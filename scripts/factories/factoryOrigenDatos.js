angular.module('ABMangularAPI.factoryOrigenDatos', [])
  app.factory('factoryRutaDatos', function ($auth) {
    var objeto = {};
    objeto.nombre = "Factory con Rutas";
    objeto.Usuarios = "http://localhost/1A-TP_PIZZERIA/WEBService/usuarios/"; // ORIGEN datos = Usuarios
    objeto.Locales = "http://localhost/1A-TP_PIZZERIA/WEBService/locales/"; // ORIGEN datos = Locales
    objeto.Ofertas = "http://localhost/1A-TP_PIZZERIA/WEBService/ofertas/"; // ORIGEN datos = Ofertas
    objeto.Productos = "http://localhost/1A-TP_PIZZERIA/WEBService/productos/"; // ORIGEN datos = Productos
    objeto.Operaciones = "http://localhost/1A-TP_PIZZERIA/WEBService/operaciones/"; // ORIGEN datos = Operaciones
    objeto.Compras = "http://localhost/1A-TP_PIZZERIA/WEBService/compras/"; // ORIGEN datos = Compras
    objeto.Reservas = "http://localhost/1A-TP_PIZZERIA/WEBService/reservas/"; // ORIGEN datos = Reservas
    
    return objeto;
    
});//FIN DE FACTORY