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
		if ($usuario->correo == $usuarioReal->correo && $usuario->clave == $usuarioReal->clave)
		{
			switch($usuarioReal->tipo_user)
			{
				case "administrador":
						$ClaveDeEncritacion = 'claveAdministrador';
						$token["usuario"] = "NovaMAS";
						$token["perfil"]="Administrador";
						$token["estado"]="activo";
						break;

				case "encargado":
					$ClaveDeEncritacion = 'claveEncargado';
					$token["usuario"] = "NovaMAS";
					$token["perfil"]="Encargado";
					$token["estado"]="activo";
					break;

				case "empleado":
					$ClaveDeEncritacion = 'claveEmpleado';
					$token["usuario"] = "NovaMAS";
					$token["perfil"]="Empleado";
					$token["estado"]="activo";
					break;

				case "cliente":
				default:
					$ClaveDeEncritacion = 'claveCliente';
					$token["usuario"] = "NovaMAS";
					$token["perfil"]="Cliente";
					$token["estado"]= $usuarioReal->estado;
					break;
			}

			$token["iat"]=time();
			$token["exp"]=time()+600; // segundos

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
