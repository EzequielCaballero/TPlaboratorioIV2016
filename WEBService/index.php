<?php

/*IMPORTANTE: actualizar la ruta si se cambia la carpeta que aloja al web service */

require 'vendor/autoload.php';
require 'PHP/clases/Usuarios.php';
require 'PHP/clases/Locales.php';
require 'PHP/clases/Ofertas.php';
require 'PHP/clases/Productos.php';

$app = new Slim\App();

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

//**************************************************************USUARIOS**************************************************************//

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $datos = Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/usuarios/{dato}', function ($request, $response, $args) {
    $parametro = json_decode($args['dato']);
    
    if(isset($parametro->exp))
    {  
        //TRAIGO CIERTOS USUARIOS
        $unUsuario = Usuario::TraerUnUsuario($parametro->usuario);
        $perfil = $unUsuario->tipo_user;
        $datos = Usuario::TraerUsuariosPorParametro($perfil, $unUsuario->id_local);
    }
    else{
        //TRAIGO SOLO EMPLEADOS
        if($parametro == "solo_Empleados"){
            $datos = Usuario::TraerUsuariosPorParametro($parametro, "nada");
        }
        else{
        //TRAIGO UN UNICO USUARIO 
        $datos = Usuario::TraerUnUsuario($parametro);
        }
    }
        
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/usuarios/{objeto}', function ($request, $response, $args) {
    
    $usuario = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    
    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Usuario::traerUltimaFila();
    $nuevaFila = $ultimoID + 1;
    $usuario->id_usuario = $nuevaFila;
    echo "Nueva fila: " . $nuevaFila;

    $cambioAnteriorEncargado = Usuario::CambioCategoriaPorLocal($usuario->id_local, "encargado", "empleado");
    $cambioJefeEnLocal = Local::CambiarEncargadoLocal($usuario);
    $datos = Usuario::InsertarUsuario($usuario);
    $response->write($datos);
    return $response;
});

$app->put('/usuarios/{objeto}', function ($request, $response, $args) {
    $usuario = json_decode($args['objeto']);
    
    if(!isset($usuario->nombre))
    {
        //echo "CAMBIAR ESTADO: " . $args['objeto'];
        $datos = Usuario::CambiarEstadoUsuario($usuario);
    }
    else
    {
        //echo "MODIFICAR USUARIO: " . $args['objeto'];
        $datos = Usuario::ModificarUsuario($usuario);
    }
    
    $response->write(json_encode($datos));
    return $response;
});

$app->delete('/usuarios/{id}', function ($request, $response, $args) {
    
    //$usuario = Usuario::TraerUnUsuario($args['id']);
    $datos = Usuario::BorrarUsuario($args['id']);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});

//**************************************************************LOCALES**************************************************************//

$app->get('/locales[/]', function ($request, $response, $args) {
    $datos = Local::TraerTodosLosLocales();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/locales/{parametro}', function ($request, $response, $args) {
    $parametro = json_decode($args['parametro']);
    $datos = Local::TraerUnLocal($parametro);
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/altaFoto[/]', function ($request, $response, $args) {

    if ( !empty( $_FILES ) )
    {
        //var_dump($_FILES);
        $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
        $ruta = "..". DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . 'temp' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
        move_uploaded_file( $temporal, $ruta );
        echo "correcto";
    }
});

$app->post('/locales/{objeto}', function ($request, $response, $args) {
    
    $local = json_decode($args['objeto']);
    //echo "<br>DATOS!: " . $args['objeto'];

    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Local::traerUltimaFila();
    $nuevaFila = $ultimoID + 1;
    $local->id_local = $nuevaFila;
    echo "Nueva fila: " . $nuevaFila;

    //RENOMBRE DE FOTOS

        $rutaVieja="../img/temp/".$local->foto1;
        $rutaNueva="Local_".$nuevaFila."-1".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../img/Locales/".$rutaNueva);
        unlink($rutaVieja);
        $local->foto1=$rutaNueva;

        $rutaVieja="../img/temp/".$local->foto2;
        $rutaNueva="Local".$nuevaFila."-2".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../img/Locales/".$rutaNueva);
        unlink($rutaVieja);
        $local->foto2=$rutaNueva;

        $rutaVieja="../img/temp/".$local->foto3;
        $rutaNueva="Local".$nuevaFila."-3".".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../img/Locales/".$rutaNueva);
        unlink($rutaVieja);
        $local->foto3=$rutaNueva;

    //CARGA OFERTAS
        $cargarOfertas = Oferta::asociarOfertasALocal($local->id_local, $local->ofertas);

    $datos = Local::NuevoLocal($local);
    $cambioUsuario = Usuario::CambioCategoriaEmpleado($local->id_encargado, $local->id_local, "encargado");
    $response->write($datos);
    return $response;
});

$app->put('/locales/{objeto}', function ($request, $response, $args) {
    
    $local = json_decode($args['objeto']);
    $datos = Local::ModificarLocal($local); 
    $response->write(json_encode($datos));
    return $response;
});

$app->delete('/locales/{id}', function ($request, $response, $args) {
    
    $id_local = $args['id'];
    $local = Local::TraerUnLocal($id_local);

    unlink("../img/Locales/".$local->foto1);
    unlink("../img/Locales/".$local->foto2);
    unlink("../img/Locales/".$local->foto3);

    $datos = Local::BorrarLocal($args['id']);
    $empleadosLibres = Usuario::LiberarUsuariosDeLocal($id_local);
    $ofertasLocal = Oferta::desvincularOfertasALocal($id_local);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});

//**************************************************************OFERTAS**************************************************************//
$app->get('/ofertas[/]', function ($request, $response, $args) {
    $datos = Oferta::TraerTodosLasOfertas();
    $response->write(json_encode($datos));
    return $response;
});

//*************************************************************PRODUCTOS*************************************************************//
$app->get('/productos[/]', function ($request, $response, $args) {
    $datos = Producto::TraerTodosLosProductos();
    $response->write(json_encode($datos));
    return $response;
});

//****************************************************************************************************************************//
//****************************************************************************************************************************//
$app->run();

// GET: lectura de recursos = TRAER LISTA DE OBJETOS
// POST: Para crear recursos = insertar objeto a la base de datos (actualizando nombre de la foto ya alojada en proyecto)
// PUT: Para editar recursos = modificar objeto en base de datos (incluyendo imagen)
// DELETE: Para eliminar recursos = Borrar objeto de la base de datos (incluyendo foto en carpeta img)
