<?php 

Class Operacion
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_operacion;
	public $tipo_operacion;
	public $fecha;
	public $id_local;
	public $id_usuario;
	public $total;
//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function TraerOperacionesPorUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from operaciones where id_usuario =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$operacionBuscada= $consulta->fetchObject('operacion');
		return $operacionBuscada;
	}

	public static function TraerTodasLasOperaciones()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from operaciones");
		$consulta->execute();
		$arrOperaciones= $consulta->fetchAll(PDO::FETCH_CLASS, "operacion");
		return $arrOperaciones;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//


	//----------------CONSULTAS ESPECIALES----------------//

}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "OPERACION"
?>