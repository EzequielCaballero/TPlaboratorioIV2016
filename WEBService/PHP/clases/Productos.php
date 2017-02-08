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

	public static function TraerProductosDeOferta($oferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT p.id_producto, p.nombre, p.precio, p.foto1, p.foto2, p.foto3 
			FROM productos as p, ofertas_productos as op
			WHERE op.id_oferta =:oferta AND op.id_producto = p.id_producto");

		$consulta->bindValue(':oferta', $oferta, PDO::PARAM_INT);
		$consulta->execute();
		$arrProducto= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");
		return $arrProducto;
	}
//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//


	//----------------CONSULTAS ESPECIALES----------------//


//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "PRODUCTO"
}

?>