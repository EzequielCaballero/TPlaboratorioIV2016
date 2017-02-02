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
  $authProvider.tokenName = 'usuario_PizzeriaARGenta'; //nombre largo
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

    //*************************************VISTA CLIENTE*************************************//
    .state('cliente', {
                url : '/cliente',
                abstract:true,
                templateUrl : 'views/Cliente/abstractoCliente.html',
                controller : 'controlCliente'
            })
    .state('cliente.inicio', {
                url : '/inicio',
                views: {
                'contenido_cliente':{
                    templateUrl : 'views/Cliente/clienteInicio.html',
                    controller : 'controlClienteInicio'
                    }
                }
            })

    //*************************************VISTA USUARIO*************************************//
    .state('usuario', {
                    url : '/usuario',
                    abstract:true,
                    templateUrl : 'views/Usuario/abstractoUsuario.html',
                    controller : 'controlUsuario'
                })
    .state('usuario.menu', {
                url: '/menu',
                views: {
                        'contenido': {
                        templateUrl: 'views/Usuario/usuarioMenu.html',
                        controller : 'controlUsuarioMenu'
                    }
                }
            })
    .state('usuario.perfil', {
      url : '/perfil/{id}?',
      views: {
                'contenido': {
                templateUrl : 'views/Usuario/usuarioPerfil.html',
                controller : 'controlUsuarioPerfil'
                }
              }
            })
    .state('usuario.login', {
      url : '/login',
      views: {
                'contenido': {
                templateUrl : 'views/Usuario/usuarioLogin.html',
                controller : 'controlUsuarioLogin'
                }
              }
            })

    .state('usuario.registro', {
      url : '/registro',
      views: {
                'contenido': {
                templateUrl : 'views/Usuario/usuarioRegistro.html',
                controller : 'controlUsuarioRegistro'
                }
              }
            })
    .state('usuario.grilla', {
      url : '/grillaUsuarios',
      views: {
                'contenido': {
                templateUrl : 'views/Usuario/usuarioGrilla.html',
                controller : 'controlUsuarioGrilla'
                }
              }
            })

    .state('usuario.directivaGrilla', {
      url : '/directivaGrilla',
      views: {
                'contenido': {
                templateUrl : 'views/Usuario/usuarioGrillaDirectiva.html',
                controller : 'controlDirectivaGrillaUser'
                }
              }
            })

    //*************************************VISTA LOCALES*************************************//
    .state('local', {
                url : '/local',
                abstract:true,
                templateUrl : 'views/Local/abstractoLocal.html',
                controller : 'controlLocal'
            })
    .state('local.menu', {
                url: '/menu',
                views: {
                        'contenido': {
                        templateUrl: 'views/Local/localMenu.html',
                        controller : 'controlLocalMenu'
                    }
                }
            })
    .state('local.grilla', {
                url: '/grillaLocales',
                views: {
                        'contenido': {
                        templateUrl: 'views/Local/localGrilla.html',
                        controller : 'controlLocalGrilla'
                    }
                }
            })
    .state('local.alta', {
                url: '/alta',
                views: {
                        'contenido': {
                        templateUrl: 'views/Local/localAlta.html',
                        controller : 'controlLocalAlta'
                    }
                }
            })

});
