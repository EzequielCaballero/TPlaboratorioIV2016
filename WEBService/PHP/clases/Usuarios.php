<?php
require_once"AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_usuario;
	public $nombre;
	public $apellido;
	public $edad;
	public $sexo;
	public $correo;
	public $direccion;
	public $coordenadas;
 	public $clave;
  	public $tipo_user;
  	public $estado;
  	public $id_local;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id_usuario;
	}
  	public function GetFullName()
	{
		return $this->apellido.", ".$this->nombre;
	}
	public function GetEmail()
	{
		return $this->correo;
	}
	public function GetAddress()
	{
		return $this->direccion;
	}
	public function GetPassword()
	{
		return $this->clave;
	}
	public function GetTipe()
	{
		return $this->tipo_user;
	}
	public function GetStatus()
	{
		return $this->direccion;
	}
	public function GetUserLocal()
	{
		return $this->id_local;
	}

	public function SetDni($valor)
	{
		$this->nombre = $valor;
	}
	public function SetEmail($valor)
	{
		$this->correo = $valor;
	}
	public function SetAddress($valor)
	{
		$this->direccion = $valor;
	}
	public function SetPassword($valor)
	{
		$this->clave = $valor;
	}
	public function SetTipe($valor)
	{
		$this->tipo_user = $valor;
	}
	public function SetStatus($valor)
	{
		$this->estado = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($nombre=NULL)
	{
		if($nombre != NULL){
			$obj = Usuario::TraerUnUsuario($id);

			$this->nombre = $obj->nombre;
			$this->apellido = $obj->apellido;
			$this->edad = $obj->edad;
			$this->sexo = $obj->sexo; 
			$this->correo = $obj->correo;
			$this->direccion = $obj->direccion;
			$this->coordenadas = $obj->coordenadas;
			$this->clave = $obj->clave;
			$this->tipo_user = $tipo_user;
			$this->estado = $obj->estado;
			$this->id_local = $obj->id_local;
		}
	}

//--------------------------------------------------------------------------------//


//--------------------------------------------TRAER DATOS--------------------------------------------//

	public function ToString()
	{
	  	return $this->nombre."-".$this->apellido."-".$this->edad."-".$this->apellido."-".$this->correo."-".$this->direccion."-".$this->coordenadas."-".$this->clave."-".$this->tipo_user;
	}

	public static function TraerUnUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where id_usuario =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('usuario');
		return $personaBuscada;
	}

	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
		return $arrPersonas;
	}

	public static function TraerTodosLosClientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios WHERE tipo_user = 'cliente'");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
		return $arrPersonas;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//

	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:sexo,:fecha,:partido,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (nombre,correo,clave,tipo_user)values(:nombre,:correo,:clave,:tipo_user)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':correo',$usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave',$usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':tipo_user', $usuario->tipo_user, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}

//--------------------------------------------------------------------------------//

	public static function BorrarUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from usuarios WHERE id_usuario=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();

	}

//--------------------------------------------------------------------------------//

	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersona(:sexo,:fecha,:partido,:foto)");
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE usuarios 
				SET 
				nombre=:nombre,
				apellido=:apellido,
				edad=:edad,
				sexo=:sexo,
				correo=:correo,
				direccion=:direccion,
				coordenadas=:coordenadas,
				clave=:clave,
				tipo_user=:tipo_user
				estado=:estado,
				id_local=:id_local,
				WHERE id_usuario=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido',$usuario->apellido, PDO::PARAM_STR);
			$consulta->bindValue(':edad',$usuario->edad, PDO::PARAM_INT);
			$consulta->bindValue(':sexo',$usuario->sexp, PDO::PARAM_STR);
			$consulta->bindValue(':correo',$usuario->correo, PDO::PARAM_STR);
			$consulta->bindValue(':direccion',$usuario->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':coordenadas',$usuario->coordenadas, PDO::PARAM_STR);
			$consulta->bindValue(':clave',$usuario->clave, PDO::PARAM_STR);
			$consulta->bindValue(':tipo_user', $usuario->tipo_user, PDO::PARAM_STR);
			$consulta->bindValue(':estado',$usuario->estado, PDO::PARAM_STR);
			$consulta->bindValue(':id_local',$usuario->id_local, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

}
