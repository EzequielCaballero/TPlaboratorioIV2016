var app = angular.module('ABMangularAPI', [
    'ui.router',
    'satellizer',
    'angularFileUpload',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.edit',
    'ngMap'
  ]);
  
  app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  
  $authProvider.loginUrl = '1A-TP_PIZZERIA/WEBservice/PHP/auth.php'; //Ruta del archivo auth que esta en jwt y direcciona a PHP
  $authProvider.tokenName = 'ElNombreDelToken'; //nombre largo
  $authProvider.tokenPrefix = 'Aplicacion'; //sarasa
  $authProvider.authHeader = 'data';

  //*************************************VISTAS*************************************//

  $urlRouterProvider.otherwise('/inicio');

  $stateProvider
    .state('inicio', {
                url : '/inicio',
                templateUrl : 'views/inicio.html',
                controller : 'controlInicio'
            })

    //*************************************VISTA USUARIO*************************************//
    .state('usuario', {
                    url : '/usuario',
                    abstract:true,
                    templateUrl : 'views/abstractoUsuario.html',
                    controller : 'controlUsuario'
                })
    .state('usuario.menu', {
                url: '/menu',
                views: {
                        'contenido': {
                        templateUrl: 'views/usuarioMenu.html',
                        controller : 'controlUsuarioMenu'
                    }
                }
            })
    .state('usuario.login', {
      url : '/login',
      views: {
                'contenido': {
                templateUrl : 'views/usuarioLogin.html',
                controller : 'controlUsuarioLogin'
                }
              }
            })

    .state('usuario.registro', {
      url : '/registro',
      views: {
                'contenido': {
                templateUrl : 'views/usuarioRegistro.html',
                controller : 'controlUsuarioRegistro'
                }
              }
            })
    .state('usuario.grilla', {
      url : '/grillaUsuarios',
      views: {
                'contenido': {
                templateUrl : 'views/usuarioGrilla.html',
                controller : 'controlUsuarioGrilla'
                }
              }
            })
    .state('usuario.modificar', {
      url : '/modificar/{id}?:nombre:email:tipo:pass',
      views: {
                'contenido': {
                templateUrl : 'views/usuarioRegistro.html',
                controller : 'controlUsuarioModificar'
                }
              }
            })

    .state('usuario.directivaGrilla', {
      url : '/directivaGrilla',
      views: {
                'contenido': {
                templateUrl : 'views/usuarioGrillaDirectiva.html',
                controller : 'controlDirectivaGrillaUser'
                }
              }
            })

    //*************************************VISTA ENTIDADES*************************************//
    .state('entidad', {
                url : '/entidad',
                abstract:true,
                templateUrl : 'views/abstractoEntidad.html',
                controller : 'controlEntidad'
            })
    .state('entidad.menu', {
                url: '/menu',
                views: {
                        'contenido': {
                        templateUrl: 'views/entidadMenu.html',
                        controller : 'controlEntidadMenu'
                    }
                }
            })
    .state('entidad.grilla', {
                url: '/grilla',
                views: {
                        'contenido': {
                        templateUrl: 'views/entidadGrilla.html',
                        controller : 'controlEntidadGrilla'
                    }
                }
            })
    .state('entidad.alta', {
                url: '/alta',
                views: {
                        'contenido': {
                        templateUrl: 'views/entidadAlta.html',
                        controller : 'controlEntidadAlta'
                    }
                }
            })

});
