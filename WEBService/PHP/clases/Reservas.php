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
	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_reserva) as ID from reservas");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

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

	public static function AgregarReserva($reserva, $id_operacion)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into reservas 
			(id_reserva,fecha_entrega,cantidad_prod,precio_final,id_operacion)
			values(:id_reserva,:fecha_entrega,:cantidad_prod,:precio_final,:id_operacion)");

		$consulta->bindValue(':id_reserva',$reserva->id_reserva, PDO::PARAM_INT);
		$consulta->bindValue(':fecha_entrega',$reserva->fecha_entrega, PDO::PARAM_STR);
		$consulta->bindValue(':cantidad_prod',$reserva->cantidad_prod, PDO::PARAM_INT);
		$consulta->bindValue(':precio_final',$reserva->precio_final, PDO::PARAM_INT);
		$consulta->bindValue(':id_operacion',$id_operacion, PDO::PARAM_INT);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	
	//----------------CONSULTAS ESPECIALES----------------//
	public static function AsociarReservaAofertas($reserva, $ofertas)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		foreach($ofertas as $oferta)
		{
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into reservas_ofertas (id_reserva, id_oferta) values(:id_reserva,:id_oferta)");
			$consulta->bindValue(':id_reserva', $reserva, PDO::PARAM_INT);
			$consulta->bindValue(':id_oferta', $oferta->id_oferta, PDO::PARAM_INT);
			$consulta->execute();
			$ultimoID = $objetoAccesoDato->RetornarUltimoIdInsertado();
		}
		return $ultimoID;
	}
	public static function AsociarReservaAproductos($reserva, $productos)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		foreach($productos as $producto)
		{
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into reservas_productos (id_reserva, id_producto) values(:id_reserva,:id_producto)");
			$consulta->bindValue(':id_reserva', $reserva, PDO::PARAM_INT);
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