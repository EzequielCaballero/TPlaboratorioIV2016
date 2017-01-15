angular.module('ABMangularAPI.factoryConServicios_Usuario', []) 
  app.factory('factoryConServicio_User', function (servicioRetornoUsuarios) {
      var objeto = {};
      objeto.nombre = "Factory con servicio Grilla Usuarios";
      objeto.traerTodos = TraerTodos; // DEFINICION de función pública (si no media asignación / traerTodos sería pública)
      return objeto;

  	function TraerTodos(){
  		return servicioRetornoUsuarios.traerTodo(); 
  	}
});