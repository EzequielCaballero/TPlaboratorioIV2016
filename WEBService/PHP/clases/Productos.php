<?php 

class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_producto;
	public $nombre;
	public $precio;
	public $foto1;
	public $foto2;
	public $foto3;

//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function TraerUnProducto($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from productos where id_producto =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$ofertaBuscada= $consulta->fetchObject('producto');
		return $ofertaBuscada;
	}

	public static function TraerTodosLosProductos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from productos");
		$consulta->execute();
		$arrProductos= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");
		return $arrProductos;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//


	//----------------CONSULTAS ESPECIALES----------------//


//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "PRODUCTO"
}

?>