<?php
require_once"AccesoDatos.php";
class Entidad
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $numero;
	public $marca;
 	public $fecha;
  	public $color;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function Getnumero()
	{
		return $this->numero;
	}
	public function Getmarca()
	{
		return $this->marca;
	}
	public function GetFecha()
	{
		return $this->fecha;
	}
	public function Getcolor()
	{
		return $this->color;
	}
	public function GetFoto()
	{
		return $this->foto;
	}

	public function Setnumero($valor)
	{
		$this->numero = $valor;
	}
	public function Setmarca($valor)
	{
		$this->marca = $valor;
	}
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}
	public function Setcolor($valor)
	{
		$this->color = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($numero=NULL)
	{
		if($numero != NULL){
			$obj = entidad::TraerUnaEntidad($numero);
			
			$this->marca = $obj->marca;
			$this->fecha = $obj->fecha;
			$this->color = $color;
			$this->foto = $obj->foto;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->marca."-".$this->fecha."-".$this->color."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaEntidad($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from entidad where numero =:numero");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaEntidad(:id)");
		$consulta->bindValue(':numero', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$EntidadBuscada= $consulta->fetchObject('entidad');
		return $EntidadBuscada;	
					
	}
	
	public static function TraerTodasLasEntidades()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from entidad");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasEntidads() ");
		$consulta->execute();			
		$arrEntidads= $consulta->fetchAll(PDO::FETCH_CLASS, "entidad");	
		return $arrEntidads;
	}
	
	public static function BorrarEntidad($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from entidad	WHERE numero=:numero");	
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarEntidad(:id)");	
		$consulta->bindValue(':numero',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarEntidad($entidad)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarEntidad(:marca,:fecha,:color,:foto)");
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE entidad 
				SET marca=:marca,
				fecha=:fecha,
				color=:color
				WHERE numero=:numero");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':numero',$entidad->numero, PDO::PARAM_INT);
			$consulta->bindValue(':marca',$entidad->marca, PDO::PARAM_STR);
			$consulta->bindValue(':fecha',$entidad->fecha, PDO::PARAM_STR);
			$consulta->bindValue(':color', $entidad->color, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarEntidad($entidad)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarEntidad (:numero,:marca,:fecha,:color,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into entidad (numero,marca,fecha,color)values(:numero,:marca,:fecha,:color)");
		$consulta->bindValue(':numero',$entidad->numero, PDO::PARAM_INT);
		$consulta->bindValue(':marca',$entidad->marca, PDO::PARAM_STR);
		$consulta->bindValue(':fecha', $entidad->fecha, PDO::PARAM_STR);
		$consulta->bindValue(':color', $entidad->color, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
//--------------------------------------------------------------------------------//
}
