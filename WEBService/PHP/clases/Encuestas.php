<?php 

class Encuesta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_encuesta;
	public $id_operacion;
	public $pregunta_1;
	public $pregunta_2;
	public $pregunta_3;
	public $pregunta_4;
	public $pregunta_5;
	public $pregunta_6;
	public $pregunta_7;
	public $pregunta_8;
	public $pregunta_9;
	public $pregunta_10;
	public $pregunta_11;
	public $pregunta_12;
	public $pregunta_13;
	public $pregunta_14;
	public $pregunta_15;
	public $pregunta_16;
	public $pregunta_17;
	public $pregunta_18;
	public $pregunta_19;
	public $pregunta_20;

//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_encuesta) as ID from encuestas");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

	public static function TraerUnaEncuesta($idEncuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from encuestas where id_encuesta =:id");
		$consulta->bindValue(':id', $idEncuesta, PDO::PARAM_INT);
		$consulta->execute();
		$encuestaBuscada= $consulta->fetchObject('encuesta');
		return $encuestaBuscada;
	}

	public static function TraerTodasLasEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from encuestas");
		$consulta->execute();
		$arrEncuestas= $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");
		return $arrEncuestas;
	}

	public static function TraerEncuestasDeCliente($oferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT p.id_producto, p.nombre, p.precio, p.foto1, p.foto2, p.foto3 
			FROM productos as p, ofertas_productos as op
			WHERE op.id_oferta =:oferta AND op.id_producto = p.id_producto");

		$consulta->bindValue(':oferta', $oferta, PDO::PARAM_INT);
		$consulta->execute();
		$arrEncuestas= $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");
		return $arrEncuestas;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//

	public static function AgregarEncuesta($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into encuestas 
			(id_encuesta,id_operacion,pregunta_1,pregunta_2,pregunta_3,pregunta_4,pregunta_5,pregunta_6,pregunta_7,pregunta_8,pregunta_9,pregunta_10,pregunta_11,pregunta_12,pregunta_13,pregunta_14,pregunta_15,pregunta_16,pregunta_17,pregunta_18,pregunta_19,pregunta_20)
			values(:id_encuesta,:id_operacion,:pregunta_1,:pregunta_2,:pregunta_3,:pregunta_4,:pregunta_5,:pregunta_6,:pregunta_7,:pregunta_8,:pregunta_9,:pregunta_10,:pregunta_11,:pregunta_12,:pregunta_13,:pregunta_14,:pregunta_15,:pregunta_16,:pregunta_17,:pregunta_18,:pregunta_19,:pregunta_20)");

		$consulta->bindValue(':id_encuesta',$encuesta->id_encuesta, PDO::PARAM_INT);
		$consulta->bindValue(':id_operacion',$encuesta->id_operacion, PDO::PARAM_INT);
		$consulta->bindValue(':pregunta_1',$encuesta->pregunta_1, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_2',$encuesta->pregunta_2, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_3',$encuesta->pregunta_3, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_4',$encuesta->pregunta_4, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_5',$encuesta->pregunta_5, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_6',$encuesta->pregunta_6, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_7',$encuesta->pregunta_7, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_8',$encuesta->pregunta_8, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_9',$encuesta->pregunta_9, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_10',$encuesta->pregunta_10, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_11',$encuesta->pregunta_11, PDO::PARAM_INT);
		$consulta->bindValue(':pregunta_12',$encuesta->pregunta_12, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_13',$encuesta->pregunta_13, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_14',$encuesta->pregunta_14, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_15',$encuesta->pregunta_15, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_16',$encuesta->pregunta_16, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_17',$encuesta->pregunta_17, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_18',$encuesta->pregunta_18, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_19',$encuesta->pregunta_19, PDO::PARAM_STR);
		$consulta->bindValue(':pregunta_20',$encuesta->pregunta_20, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	//----------------CONSULTAS ESPECIALES----------------//


//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "ENCUESTA"
}

?>