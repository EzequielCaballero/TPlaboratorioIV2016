<?php

include "clases/Personas.php";
include "clases/Usuarios.php";

//CARGA INICIAL DE LA FOTO EN DIRECTORIO DE FOTOS DEL PROYECTO
if ( !empty( $_FILES ) )
{
    $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
    $ruta = "..". DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $temporal, $ruta );
    echo "correcto";
}


//MANEJO DE ACCIONES (GRILLA / ALTA / BAJA / MODIFICACION)
if(isset($_GET['accion']))
{
  $accion=$_GET['accion'];
  switch($accion)
  {
    case "traerLista":
        $respuesta= array();
        //$respuesta['listado']=Persona::TraerPersonasTest();
        $respuesta['listado']=Persona::TraerTodasLasPersonas();
        //var_dump(Persona::TraerTodasLasPersonas());
        $arrayJson = json_encode($respuesta);
        echo  $arrayJson;
        break;

    case "traerListaUsuarios":
        $respuesta= array();
    		$respuesta['listado']=Usuario::TraerTodosLosUsuarios();
    		//var_dump(Persona::TraerTodasLosUsuarios());
    		$arrayJson = json_encode($respuesta);
    		echo  $arrayJson;
        break;
  }

}
else
{
	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	var_dump($respuesta);
	switch($respuesta->datos->accion)
	{
    //**********************************PERSONA**********************************//
		case "Alta":
		{
			//La foto se asume que ya se encuentra cargada en la carpeta del proyecto
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				$rutaVieja="../img/".$respuesta->datos->persona->foto;
				$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../img/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->persona->foto=$rutaNueva;
				echo "Ruta vieja: " . $rutaVieja . "\n";
				echo "Ruta Nueva: " . $rutaNueva;
			}
			Persona::InsertarPersona($respuesta->datos->persona);
			break;
		}
		case "Baja":
		{
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				unlink("../img/".$respuesta->datos->persona->foto);
			}
			echo "estoy borrando...";
			Persona::BorrarPersona($respuesta->datos->persona->dni);
			break;
		}
		case "Modificacion":
		{
			if($respuesta->datos->persona->foto!="pordefecto.png")
			{
				$rutaVieja="../img/".$respuesta->datos->persona->foto;
				$rutaNueva=$respuesta->datos->persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
				copy($rutaVieja, "../img/".$rutaNueva);
				unlink($rutaVieja);
				$respuesta->datos->persona->foto=$rutaNueva;
			}
			Persona::ModificarPersona($respuesta->datos->persona);
			break;
    }
    case "buscar":
    {
      echo json_encode(Persona::TraerUnaPersona($respuesta->datos->dni));
      break;
    }
    //**********************************USUARIO**********************************//
    case "Registrar":
  	{
  			Usuario::InsertarUsuario($respuesta->datos->usuario);
  			break;
  	}
    case "BajaUsuario":
    {
        Usuario::BorrarUsuario($respuesta->datos->usuario->dni);
        break;
    }

	}
}
	/*else
	{
		echo 'No se cargo el archivo';
	}*/

	//echo $respuesta->datos->persona->nombre;
 ?>
