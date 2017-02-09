<?php 

Class Reserva
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_reserva;
	public $fecha_entrega;
	public $cantidad_prod;
	public $precio_final;
	public $id_operacion;
//--------------------------------------------TRAER DATOS--------------------------------------------//

	public static function TraerCiertasReservas($idOperacion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from reservas where id_operacion =:id");
		$consulta->bindValue(':id', $idOperacion, PDO::PARAM_INT);
		$consulta->execute();
		$reservaBuscada= $consulta->fetchObject('reserva');
		return $reservaBuscada;
	}

	public static function TraerTodasLasReservas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from reservas");
		$consulta->execute();
		$arrReservas= $consulta->fetchAll(PDO::FETCH_CLASS, "reserva");
		return $arrReservas;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//


	//----------------CONSULTAS ESPECIALES----------------//

}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "OPERACION"
?>