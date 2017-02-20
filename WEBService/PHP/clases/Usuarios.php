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

	public static function traerUltimaFila()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT MAX(id_usuario) as ID from usuarios");
		$consulta->execute();
		$resultado = $consulta->fetchAll();

		return $resultado[0]["ID"];
	}

	public static function TraerUnUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where id_usuario =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;
	}

	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios");
		$consulta->execute();
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
		return $arrPersonas;
	}

	public static function TraerUsuariosPorParametro($criterio, $datoExtra)
	{
		$consulta = "";
		switch($criterio)
		{
			case "empleado":
				$consulta = "SELECT * from usuarios WHERE tipo_user = 'cliente'";
				break;

			case "solo_Empleados":
				$consulta = "SELECT * from usuarios WHERE tipo_user = 'empleado'";
				break;

			case "encargado":
				$consulta = "SELECT * from usuarios WHERE tipo_user = 'cliente' OR tipo_user = 'empleado' AND id_local =:id_local";
				break;

			case "administrador":
				$consulta = "SELECT * from usuarios WHERE tipo_user = 'cliente' OR tipo_user = 'empleado' OR tipo_user = 'encargado'";
				break;
		}

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta($consulta);
		$consulta->bindValue(':id_local', $datoExtra, PDO::PARAM_INT);
		$consulta->execute();
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");
		return $arrPersonas;
	}

//--------------------------------------------ALTA-BAJA-MODIFICACION--------------------------------------------//

	public static function InsertarUsuario($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			INSERT into usuarios 
			(id_usuario,nombre,apellido,edad,sexo,correo,direccion,coordenadas,clave,tipo_user,estado,id_local)
			values(:id_usuario,:nombre,:apellido,:edad,:sexo,:correo,:direccion,:coordenadas,:clave,:tipo_user,:estado,:id_local)");

		$consulta->bindValue(':id_usuario',$usuario->id_usuario, PDO::PARAM_INT);
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':apellido',$usuario->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':edad',$usuario->edad, PDO::PARAM_INT);
		$consulta->bindValue(':sexo',$usuario->sexo, PDO::PARAM_STR);
		$consulta->bindValue(':correo',$usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':direccion',$usuario->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':coordenadas',$usuario->coordenadas, PDO::PARAM_STR);
		$consulta->bindValue(':clave',$usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':tipo_user', $usuario->tipo_user, PDO::PARAM_STR);
		$consulta->bindValue(':estado',$usuario->estado, PDO::PARAM_STR);
		$consulta->bindValue(':id_local',$usuario->id_local, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}

//--------------------------------------------------------------------------------//

	public static function BorrarUsuario($idParametro)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE from usuarios WHERE id_usuario=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount();

	}

//--------------------------------------------------------------------------------//

	public static function ModificarUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
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
				tipo_user=:tipo_user,
				estado=:estado,
				id_local=:id_local
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

	//----------------CONSULTAS ESPECIALES----------------//
	public static function CambiarEstadoUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET estado=:estado WHERE id_usuario=:id_usuario");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':estado',$usuario->estado, PDO::PARAM_STR);
			$consulta->bindValue(':id_usuario',$usuario->id, PDO::PARAM_INT);
			return $consulta->execute();
	}

	public static function CambiarLocalUsuario($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET id_local=:local WHERE id_usuario=:id_usuario");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':local',$usuario->id_local, PDO::PARAM_STR);
			$consulta->bindValue(':id_usuario',$usuario->id, PDO::PARAM_INT);
			return $consulta->execute();
	}

	public static function CambioCategoriaEmpleado($id, $id_local, $tipo)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET estado='activo', tipo_user=:tipo_user, id_local=:id_local WHERE id_usuario=:id_usuario");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':tipo_user', $tipo, PDO::PARAM_STR);
			$consulta->bindValue(':id_local', $id_local, PDO::PARAM_INT);
			$consulta->bindValue(':id_usuario',$id, PDO::PARAM_INT);
			return $consulta->execute();
	}

	public static function CambioCategoriaPorLocal($id_local, $categoriaActual, $categoriaNueva)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET tipo_user=:categoriaNueva WHERE id_local=:id_local AND tipo_user=:categoriaActual");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta->bindValue(':categoriaNueva', $categoriaNueva, PDO::PARAM_STR);
			$consulta->bindValue(':categoriaActual', $categoriaActual, PDO::PARAM_STR);
			$consulta->bindValue(':id_local', $id_local, PDO::PARAM_INT);
			return $consulta->execute();
	}

	public static function LiberarUsuariosDeLocal($id_local)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET id_local=NULL, estado='inactivo', tipo_user='empleado' WHERE id_local=:id_local");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id_local', $id_local, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//
//--FIN DE LA CLASE "USUARIO"
}

?>