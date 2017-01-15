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
		if ($usuario->email == $usuarioReal->email && $usuario->password == $usuarioReal->password)
		{
			switch($usuarioReal->tipo)
			{
				case "admin":
						$ClaveDeEncritacion = 'claveAdministrador';
						$token["usuario"] = "Administrador";
						$token["perfil"]="admin";
						break;

				case "vend":
					$ClaveDeEncritacion = 'claveVendedor';
					$token["usuario"] = "Vendedor";
					$token["perfil"]="vendedor";
					break;

				case "compr":
					$ClaveDeEncritacion = 'claveComprador';
					$token["usuario"] = "Comprador";
					$token["perfil"]="comprador";
					break;

				default:
						$ClaveDeEncritacion = 'claveUsuario';
						$token["usuario"] = "Usuario";
						$token["perfil"]="user";
						break;
			}

			$token["iat"]=time();
			$token["exp"]=time()+600; // segundos

			$jwt = JWT::encode($token, $ClaveDeEncritacion); //genero el token con los datos que quiero
			$ArrayConToken["ElNombreDelToken"]=$jwt;//Guardo el token en un array (el nombre del token tiene que ser el mismo que en el js)!!
			break;
		}
		else {
		 $ArrayConToken["ElNombreDelToken"]= false;
		}
}

echo json_encode($ArrayConToken);//devuelvo el array que contiene el token

?>
