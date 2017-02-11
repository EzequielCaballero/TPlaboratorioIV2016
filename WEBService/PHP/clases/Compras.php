<?php 

Class Compra
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_compra;
	public $cantidad_prod;
	public $precio_final;
	public $id_operacion;
//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_compra) as ID from compras");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

	public static function TraerCiertasCompras($idOperacion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from compras where id_operacion =:id");
		$consulta->bindValue(':id', $idOperacion, PDO::PARAM_INT);
		$consulta->execute();
		$compraBuscada= $consulta->fetchObject('compra');
		return $compraBuscada;
	}

	public static function TraerTodasLasCompras()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from compras");
		$consulta->execute();
		$arrCompras= $consulta->fetchAll(PDO::FETCH_CLASS, "compra");
		return $arrCompras;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//

	public static function AgregarCompra($compra, $id_operacion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into compras 
			(id_compra,cantidad_prod,precio_final,id_operacion)
			values(:id_compra,:cantidad_prod,:precio_final,:id_operacion)");

		$consulta->bindValue(':id_compra',$compra->id_compra, PDO::PARAM_INT);
		$consulta->bindValue(':cantidad_prod',$compra->cantidad_prod, PDO::PARAM_INT);
		$consulta->bindValue(':precio_final',$compra->precio_final, PDO::PARAM_INT);
		$consulta->bindValue(':id_operacion',$id_operacion, PDO::PARAM_INT);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}

	//----------------CONSULTAS ESPECIALES----------------//
	public static function AsociarCompraAofertas($compra, $ofertas)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		foreach($ofertas as $oferta)
		{	
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into compras_ofertas (id_compra, id_oferta) values(:id_compra,:id_oferta)");
			$consulta->bindValue(':id_compra', $compra, PDO::PARAM_INT);
			$consulta->bindValue(':id_oferta', $oferta->id_oferta, PDO::PARAM_INT);
			$consulta->execute();
			$ultimoID = $objetoAccesoDato->RetornarUltimoIdInsertado();
		}
		return $ultimoID;
	}
	public static function AsociarCompraAproductos($compra, $productos)
	{
		echo "<br>PRODUCTOS: ";
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		foreach($productos as $producto)
		{
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into compras_productos (id_compra, id_producto) values(:id_compra,:id_producto)");
			$consulta->bindValue(':id_compra', $compra, PDO::PARAM_INT);
			$consulta->bindValue(':id_producto', $producto->id_producto, PDO::PARAM_INT);
			$consulta->execute();
			$ultimoID = $objetoAccesoDato->RetornarUltimoIdInsertado();
		}
		return $ultimoID;
	}
}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "OPERACION"
?>