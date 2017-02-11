angular.module('ABMangularAPI.controladorUsuarioEncuesta', [])
	app.controller('controlClienteEncuesta', function($scope, $http, $state, $auth) {

	if(!$auth.isAuthenticated())
      $state.go("inicio");

  	  $scope.pizzaFavoritaOpciones = [
        {code:"muzzarella", name: "Muzzarella"},
        {code:"anchoas",    name:"Anchoas"    },
        {code:"napolitana", name:"Napolitana" },
        {code:"capresse",   name:"Capresse"   },
        {code:"calabresa",  name:"Calabresa"  },
        {code:"americana",  name:"Americana"  },
        {code:"roquefort",  name:"Roquefort"  },
        {code:"fugazza",    name:"Fugazza"    },
        {code:"fugazzeta",  name:"Fugazzeta"  },
        {code:"provolone",  name:"Provolone"  },
        {code:"otra",       name:"Otra"       }
      ];

      $scope.ingredienteOpciones = [
      	{code:"Salsa",   name: "Salsa"  },
      	{code:"Oregano", name: "Oregano"},
      	{code:"Queso",   name: "Queso"  },
      	{code:"Masa",    name: "Masa"   },
      	{code:"Fiambre", name: "Fiambre"},
      	{code:"Otro",    name: "Otro"   }
	  ];

	  $scope.encuesta = {};
	  $scope.encuesta.pregunta_1;
	  $scope.encuesta.pregunta_2;
	  $scope.encuesta.pregunta_3;
	  $scope.encuesta.pregunta_4;
	  $scope.encuesta.pregunta_5;
	  $scope.encuesta.pregunta_6;
	  $scope.encuesta.pregunta_7;
	  $scope.encuesta.pregunta_8;
	  $scope.encuesta.pregunta_9;
	  $scope.encuesta.pregunta_10;
	  $scope.encuesta.pregunta_11;
	  $scope.encuesta.pregunta_12;
	  $scope.encuesta.pregunta_13;
	  $scope.encuesta.pregunta_14;
	  $scope.encuesta.pregunta_15;
	  $scope.encuesta.pregunta_16;
	  $scope.encuesta.pregunta_17;
	  $scope.encuesta.pregunta_18;
	  $scope.encuesta.pregunta_19;
	  $scope.encuesta.pregunta_20;

});