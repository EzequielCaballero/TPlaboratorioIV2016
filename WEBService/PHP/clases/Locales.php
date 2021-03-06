<?php 

class Local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_local;
	public $direccion;
	public $id_encargado;
	public $foto1;
	public $foto2;
	public $foto3;
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
	public function GetId()
	{
		return $this->local;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function GetIdEncargado()
	{
		return $this->id_encargado;
	}
	public function GetFotos()
	{
		return $this->foto1."-".$this->foto2."-".$this->foto3;
	}
	//*******************************************************//
	public function SetId($valor)
	{
		$this->local = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetIdEncargado($valor)
	{
		$this->id_encargado = $valor;
	}
	public function SetFotos($valor)
	{
		return $this->foto1."-".$this->foto2."-".$this->foto3;
		$fotos = explode("-", $valor);
		if(trim($fotos[0])!="")
		{
			$this->foto1 = $fotos[0];
			$this->foto2 = $fotos[1];
			$this->foto3 = $fotos[2];
		}
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Local::TraerUnLocal($id);

			//$this->id_local = $obj->id_local;
			$this->direccion = $obj->direccion;
			$this->id_encargado = $obj->id_encargado;
			$this->foto1 = $obj->foto1;
			$this->foto2 = $obj->foto2;
			$this->foto3 = $obj->foto3;
		}
	}


//--------------------------------------------------------------------------------//
//--TRAER DATOS

	public function ToString()
	{
	  	return $this->id_local."-".$this->direccion."-".$this->id_encargado."-".$this->foto1."-".$this->foto2."-".$this->foto3;
	}

	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_local) as ID from locales");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

	public static function TraerUnLocal($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT l.id_local, l.direccion, CONCAT(e.apellido,', ',e.nombre) as encargado, l.foto1, l.foto2, l.foto3 
			FROM locales as l, usuarios as e
			WHERE l.id_local =:id AND l.id_encargado = e.id_usuario");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$localBuscado= $consulta->fetchObject('local');
		return $localBuscado;
	}

	public static function TraerTodosLosLocales()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT l.id_local, l.direccion, CONCAT(e.apellido,', ',e.nombre) as encargado, l.foto1, l.foto2, l.foto3 
			FROM locales as l, usuarios as e
			WHERE l.id_encargado = e.id_usuario");
		$consulta->execute();
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "local");
		return $arrPersonas;
	}

//--------------------------------------------------------------------------------//
//--ALTA-BAJA-MODIFICACION
	
	public static function NuevoLocal($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into locales 
			(id_local,direccion,id_encargado,foto1,foto2,foto3)
			values(:id_local,:direccion,:id_encargado,:foto1,:foto2,:foto3)");

		$consulta->bindValue(':id_local',$local->id_local, PDO::PARAM_INT);
		$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':id_encargado',$local->id_encargado, PDO::PARAM_STR);
		$consulta->bindValue(':foto1',$local->foto1, PDO::PARAM_STR);
		$consulta->bindValue(':foto2',$local->foto2, PDO::PARAM_STR);
		$consulta->bindValue(':foto3',$local->foto3, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
	//---------------------------------------------------------------------------//

	public static function BorrarLocal($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from locales WHERE id_local=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();
	}

	//---------------------------------------------------------------------------//

	public static function ModificarLocal($local)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE locales
				SET 
				direccion=:direccion,
				id_encargado=:id_encargado,
				foto1=:foto1,
				foto2=:foto2,
				foto3=:foto3,
				clave=:clave
				WHERE id_local=:id_local");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':id_local',$local->id_local, PDO::PARAM_INT);
			$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':id_encargado',$local->id_encargado, PDO::PARAM_STR);
			$consulta->bindValue(':foto1',$local->foto1, PDO::PARAM_STR);
			$consulta->bindValue(':foto2',$local->foto2, PDO::PARAM_STR);
			$consulta->bindValue(':foto3',$local->foto3, PDO::PARAM_STR);
			return $consulta->execute();
	}

	//----------------CONSULTAS ESPECIALES----------------//
	
	public static function CambiarEncargadoLocal($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE locales SET id_encargado=:nuevoEncargado WHERE id_local=:id_local");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta->bindValue(':nuevoEncargado', $usuario->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':id_local', $usuario->id_local, PDO::PARAM_INT);
		return $consulta->execute();
	}
	public static function ModificarDireccion($datos)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE locales SET direccion=:nuevaDireccion WHERE id_local=:id_local");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta->bindValue(':nuevaDireccion', $datos->nuevaDireccion, PDO::PARAM_STR);
		$consulta->bindValue(':id_local', $datos->id_local, PDO::PARAM_INT);
		return $consulta->execute();
	}
	public static function ModificarEncargado($datos)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE locales SET id_encargado=:nuevoEncargado WHERE id_local=:id_local");
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta->bindValue(':nuevoEncargado', $datos->nuevoEncargado, PDO::PARAM_INT);
		$consulta->bindValue(':id_local', $datos->id_local, PDO::PARAM_INT);
		return $consulta->execute();
	}
//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "LOCAL"
}	

?>