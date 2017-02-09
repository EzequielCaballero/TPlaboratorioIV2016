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

	public static function AgregarCompra($compra)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into compras 
			(id_compra,cantidad_prod,precio_final,id_operacion)
			values(:id_compra,:cantidad_prod,:precio_final,:id_operacion)");

		$consulta->bindValue(':id_compra',$compra->id_compra, PDO::PARAM_INT);
		$consulta->bindValue(':cantidad_prod',$compra->cantidad_prod, PDO::PARAM_INT);
		$consulta->bindValue(':precio_final',$compra->precio_final, PDO::PARAM_INT);
		$consulta->bindValue(':id_operacion',$compra->id_operacion, PDO::PARAM_INT);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	//----------------CONSULTAS ESPECIALES----------------//

}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "OPERACION"
?>