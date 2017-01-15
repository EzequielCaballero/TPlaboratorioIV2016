<?php
require_once"AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $email;
 	public $password;
  	public $tipo;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->nombre;
	}
  	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetEmail()
	{
		return $this->email;
	}
	public function GetPassword()
	{
		return $this->password;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}

	public function SetDni($valor)
	{
		$this->nombre = $valor;
	}
	public function SetEmail($valor)
	{
		$this->email = $valor;
	}
	public function SetPassword($valor)
	{
		$this->password = $valor;
	}
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($nombre=NULL)
	{
		if($nombre != NULL){
			$obj = Usuario::TraerUnUsuario($id);

			$this->nombre = $obj->nombre; 
			$this->email = $obj->email;
			$this->password = $obj->password;
			$this->tipo = $tipo;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING
  	public function ToString()
	{
	  	return $this->nombre."-".$this->email."-".$this->password."-".$this->tipo;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnUsuario($idParametro)
	{


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario where id =:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerUnaPersona(:id)");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('usuario');
		return $personaBuscada;

	}

	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
		return $arrPersonas;
	}

	public static function BorrarUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from usuario	WHERE id=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();

	}

	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			//$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersona(:sexo,:fecha,:partido,:foto)");
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE usuario 
				SET nombre=:nombre,
				email=:email,
				tipo=:tipo
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':email',$usuario->email, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:sexo,:fecha,:partido,:foto)");
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario (nombre,email,password,tipo)values(:nombre,:email,:password,:tipo)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':email',$usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(':password',$usuario->password, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $usuario->tipo, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
//--------------------------------------------------------------------------------//

}
