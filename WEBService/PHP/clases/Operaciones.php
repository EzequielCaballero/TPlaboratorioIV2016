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

	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_operacion) as ID from operaciones");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

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
	public static function AgregarOperacion($operacion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into operaciones 
			(id_operacion,tipo_operacion,fecha,id_local,id_usuario,total)
			values(:id_operacion,:tipo_operacion,:fecha,:id_local,:id_usuario,:total)");

		$consulta->bindValue(':id_operacion',$operacion->id_operacion, PDO::PARAM_INT);
		$consulta->bindValue(':tipo_operacion',$operacion->tipo_operacion, PDO::PARAM_STR);
		$consulta->bindValue(':fecha',$operacion->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':id_local',$operacion->id_local, PDO::PARAM_INT);
		$consulta->bindValue(':id_usuario',$operacion->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':total',$operacion->total, PDO::PARAM_INT);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

	//----------------CONSULTAS ESPECIALES----------------//
}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "OPERACION"
?>