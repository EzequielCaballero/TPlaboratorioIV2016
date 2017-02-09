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


	//----------------CONSULTAS ESPECIALES----------------//

}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "OPERACION"
?>