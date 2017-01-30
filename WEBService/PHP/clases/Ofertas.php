<?php 

class Oferta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_oferta;
	public $titulo;
	public $cant_productos;
	public $precio;

//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function TraerUnaOferta($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from ofertas where id_oferta =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$ofertaBuscada= $consulta->fetchObject('oferta');
		return $ofertaBuscada;
	}

	public static function TraerTodosLasOfertas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from ofertas");
		$consulta->execute();
		$arrOfertas= $consulta->fetchAll(PDO::FETCH_CLASS, "oferta");
		return $arrOfertas;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//


	//----------------CONSULTAS ESPECIALES----------------//

	public static function asociarOfertasALocal($local, $ofertas)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		foreach($ofertas as $oferta)
		{
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into locales_ofertas (id_local, id_oferta) values(:id_local,:id_oferta)");
			$consulta->bindValue(':id_local', $local, PDO::PARAM_INT);
			$consulta->bindValue(':id_oferta', $oferta, PDO::PARAM_INT);
			$consulta->execute();
			$ultimoID = $objetoAccesoDato->RetornarUltimoIdInsertado();
		}
		return $ultimoID;
	}

	public static function desvincularOfertasALocal($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from locales_ofertas where id_local=:id_local");
		$consulta->bindValue(':id_local', $local, PDO::PARAM_INT);
		$consulta->execute();
		$filasTotales = $consulta->rowCount();

		return $filasTotales;
	}

//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "USUARIO"
}

?>