<?php 

class Registro_sesiones
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_registro;
	public $id_usuario;
	public $tipo_usuario;
	public $nombre;
	public $fecha;
	public $hora;

//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_registro) as ID from registro_sesiones");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

	public static function TraerUnRegistro($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from registro_sesiones where id_usuario =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$ofertaBuscada= $consulta->fetchObject('Registro_sesiones');
		return $ofertaBuscada;
	}

	public static function TraerTodosLosRegistros()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from registro_sesiones");
		$consulta->execute();
		$arrRegistros= $consulta->fetchAll(PDO::FETCH_CLASS, "Registro_sesiones");
		return $arrRegistros;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//
	public static function agregarNuevoRegistro($registro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into registro_sesiones (id_registro, id_usuario, nombre, fecha, hora, tipo_usuario) 
			values(:id_registro,:id_usuario,:nombre,:fecha,:hora,:tipo_usuario)");
		$consulta->bindValue(':id_registro', $registro->id_registro, PDO::PARAM_INT);
		$consulta->bindValue(':id_usuario', $registro->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':nombre', $registro->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $registro->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':hora', $registro->hora, PDO::PARAM_STR);
		$consulta->bindValue(':tipo_usuario', $registro->tipo_usuario, PDO::PARAM_STR);
		$consulta->execute();
		$ultimoID = $objetoAccesoDato->RetornarUltimoIdInsertado();
		return $ultimoID;
	}

	//----------------CONSULTAS ESPECIALES----------------//

//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "REGISTRO SESIONES"
}

?>