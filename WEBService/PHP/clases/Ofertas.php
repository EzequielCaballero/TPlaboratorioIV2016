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


//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "USUARIO"
}

?>