angular.module('ABMangularAPI.directivasUsuario', [])

app.directive('userGrillaAbm', function() {

return {
	scope : {miUsuario : '=usuario'}, 
	replace : true, 
	restrict : "MEAC", 
	templateUrl : "templates/templateGrillaUsuarios.html"};

})