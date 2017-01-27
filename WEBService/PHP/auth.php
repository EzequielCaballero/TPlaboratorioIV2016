<?php
include_once '../jwt/vendor/autoload.php';
include_once 'clases/Usuarios.php';
use \Firebase\JWT\JWT;

$datosDelModeloPorPOST = file_get_contents('php://input'); // Metodo para traer los datos de JS.
$usuario = json_decode($datosDelModeloPorPOST);

$Array_usuarios = Usuario::TraerTodosLosUsuarios();
//var_dump($Array_usuarios);

//if ($usuario->email == 'admin@admin.com' && $usuario->password == '4321'){
foreach($Array_usuarios as $usuarioReal)
{
		if ($usuario->correo == $usuarioReal->correo && $usuario->clave == $usuarioReal->clave && $usuarioReal->estado == "activo")
		{
			switch($usuarioReal->tipo_user)
			{
				case "administrador":
						$ClaveDeEncritacion = 'claveAdministrador';
						$token["usuario"] = $usuarioReal->id_usuario;
						$token["perfil"]="Administrador";
						$token["estado"]="activo";
						$token["nombre"]= $usuarioReal->apellido.", ".$usuarioReal->nombre;
						$token["direccion"]= $usuarioReal->direccion;
						$token["local"]= $usuarioReal->id_local;
						break;

				case "encargado":
					$ClaveDeEncritacion = 'claveEncargado';
					$token["usuario"] = $usuarioReal->id_usuario;
					$token["perfil"]="Encargado";
					$token["estado"]="activo";
					$token["nombre"]= $usuarioReal->apellido.", ".$usuarioReal->nombre;
					$token["direccion"]= $usuarioReal->direccion;
					$token["local"]= $usuarioReal->id_local;
					break;

				case "empleado":
					$ClaveDeEncritacion = 'claveEmpleado';
					$token["usuario"] = $usuarioReal->id_usuario;
					$token["perfil"]="Empleado";
					$token["estado"]="activo";
					$token["nombre"]= $usuarioReal->apellido.", ".$usuarioReal->nombre;
					$token["direccion"]= $usuarioReal->direccion;
					$token["local"]= $usuarioReal->id_local;
					break;

				case "cliente":
				default:
					$ClaveDeEncritacion = 'claveCliente';
					$token["usuario"] = $usuarioReal->id_usuario;
					$token["perfil"]="Cliente";
					$token["estado"]= $usuarioReal->estado;
					$token["nombre"]= $usuarioReal->apellido.", ".$usuarioReal->nombre;
					$token["direccion"]= $usuarioReal->direccion;
					$token["local"]= $usuarioReal->id_local;
					break;
			}

			$token["iat"]=time();
			$token["exp"]=time()+3600; // segundos

			$jwt = JWT::encode($token, $ClaveDeEncritacion); //genero el token con los datos que quiero
			$ArrayConToken["usuario_PizzeriaARGenta"]=$jwt;//Guardo el token en un array (el nombre del token tiene que ser el mismo que en el js)!!
			break;
		}
		else {
		 $ArrayConToken["usuario_PizzeriaARGenta"]= false;
		}
}

echo json_encode($ArrayConToken);//devuelvo el array que contiene el token

?>
