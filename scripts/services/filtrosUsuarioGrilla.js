angular.module('ABMangularAPI.filtrosUsuarioGrilla', []) 
  app.filter('tipo', function () {
    var perfil = {
      'admin': 'Administrador',
      'vend': 'Vendedor',
      'compr': 'Comprador'
    }
    return function (input) {
      return perfil[input];
    };
  });

// angular.module('ABMangularAPI.filtrosUsuarioGrilla', []) 
//   app.filter('tipo', function () {
//     var perfil = {
//       1: 'Administrador',
//       2: 'Vendedor',
//       3: 'Comprador'
//     }
//     return function (input) {
//       if (!input)
//         return '';
//       return perfil[input];
//     };
//   })