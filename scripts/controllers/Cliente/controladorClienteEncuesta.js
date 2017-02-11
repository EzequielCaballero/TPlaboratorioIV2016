angular.module('ABMangularAPI.controladorUsuarioEncuesta', [])
	app.controller('controlClienteEncuesta', function($scope, $http, $state, $auth, $stateParams) {

	if(!$auth.isAuthenticated())
      $state.go("inicio");

  	  //CARGA DE OPCIONES A LOS SELECT
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
      	{code:"salsa",   name: "Salsa"  },
      	{code:"oregano", name: "Oregano"},
      	{code:"queso",   name: "Queso"  },
      	{code:"masa",    name: "Masa"   },
      	{code:"fiambre", name: "Fiambre"},
      	{code:"otro",    name: "Otro"   }
	  ];

	  $scope.seEnteroOpciones = [
      	{code:"amigo",   name: "Por un amigo"  },
      	{code:"television", name: "En la television"},
      	{code:"radio",   name: "Por radio"  },
      	{code:"diario",    name: "En el diario"   },
      	{code:"tengo que corregirte", name: "Tengo que corregirte"}
	  ];

	  $scope.esperaProductoOpciones = [
	  	{code:"10 min",    name: "10 min"    },
      	{code:"30 min",    name: "30 min"    },
      	{code:"1 hora",    name: "1 hora"    },
      	{code:"2 horas",   name: "2 horas"   },
      	{code:"Lo que de", name: "Lo que de" }
	  ];

	  //LOGICA CASO DE INGRESAR OTRA RAZON
	  $scope.otraRazon_p6 = false;
	  $scope.otraRazon_pregunta_6;
	  $scope.otraOpcionPregunta_6 = function(esRadioButton){
	  	if(esRadioButton)
	  	{
	  		$("#razon4").prop('checked', '');
	  		$scope.otraRazon_pregunta_6 = "";
	  	}

	  	if($("#razon4").prop('checked'))
	  		$scope.otraRazon_p6 = true;
	  	else
	  	{
	  		$scope.otraRazon_p6 = false;
	  		$scope.otraRazon_pregunta_6 = "";
	  	}
	  }

	  $scope.otraRazon_p19 = false;
	  $scope.otraRazon_pregunta_19;
	  $scope.otraOpcionPregunta_19 = function(esRadioButton){
	  	if(esRadioButton)
	  	{
	  		$("#queMejorar5").prop('checked', '');
	  		$scope.otraRazon_pregunta_19 = "";
	  	}

	  	if($("#queMejorar5").prop('checked'))
	  		$scope.otraRazon_p19 = true;
	  	else
	  	{
	  		$scope.otraRazon_p19 = false;
	  		$scope.otraRazon_pregunta_19 = "";
	  	}
	  }

	  //ARMADO DE OBJETO ENCUESTA
	  $scope.encuesta = {};
	  $scope.numeroOperacion = $stateParams.id_operacion;
	  $scope.encuesta.id_operacion = $stateParams.id_operacion;

	  $scope.encuesta.pregunta_1;
	  $scope.encuesta.pregunta_2;
	  $scope.encuesta.pregunta_3;
	  $scope.encuesta.pregunta_4;
	  $scope.encuesta.pregunta_5;

	  if($scope.otraRazon_pregunta_6 != "")
	  	$scope.encuesta.pregunta_6 = $scope.otraRazon_pregunta_6;
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

	  if($scope.otraRazon_pregunta_19 != "")
	  	$scope.encuesta.pregunta_19 = $scope.otraRazon_pregunta_19;
	  $scope.encuesta.pregunta_19;

	  $scope.encuesta.pregunta_20;

	  //ENVIAR FORMULARIO
	  $scope.EnviarEncuesta = function(){
	  	alert("enviando!");
	  }

});