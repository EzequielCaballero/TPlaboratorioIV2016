<?php

/*IMPORTANTE: actualizar la ruta si se cambia la carpeta que aloja al web service */

require 'vendor/autoload.php';
require 'PHP/clases/Usuarios.php';
require 'PHP/clases/Locales.php';

$app = new Slim\App();

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});


$app->get('/entidades[/]', function ($request, $response, $args) {
    $datos = entidad::TraerTodasLasEntidades();
    $response->write(json_encode($datos));
    //INTERNAL SERVER ERROR 500 -> Porque le estaba devolviendo una referencia a memoria del servidor (hay que pasar un "string" del objeto transformado a json!!)
    
    return $response;
});

$app->post('/entidades/{objeto}', function ($request, $response, $args) {
    
    $entidad = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    
    $datos = entidad::InsertarEntidad($entidad);
    $response->write($datos);
    return $response;
});

$app->put('/entidades/{objeto}', function ($request, $response, $args) {
    
    $entidad = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    
    if($entidad->foto!="pordefecto.png")
    {
        $rutaVieja="../img/".$entidad->foto;
        $rutaNueva=$entidad->numero.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../img/".$rutaNueva);
        unlink($rutaVieja);
        $entidad->foto=$rutaNueva;
    }
    $datos = entidad::ModificarEntidades($entidad);
    $response->write($datos);
    return $response;
});


$app->delete('/entidades/{numero}', function ($request, $response, $args) {
    
    $datos = entidad::BorrarEntidad($args['numero']);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});


//**************************************************************USUARIOS**************************************************************//

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $datos = Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/usuarios/{perfil}', function ($request, $response, $args) {
    $perfil = json_decode($args['perfil']);
    if($perfil == "Empleado" || $perfil == "solo_Empleados" || $perfil == "Encargado" || $perfil == "Administrador")
        $datos = Usuario::TraerUsuariosPorParametro($perfil);
    else
        $datos = Usuario::TraerUnUsuario($perfil);
        
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/usuarios/{objeto}', function ($request, $response, $args) {
    
    $usuario = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    
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
    // $parametro = json_decode($args['parametro']);
    // $response->write(json_encode($datos));
    // return $response;
});

$app->post('/altaFoto[/]', function ($request, $response, $args) {

    if ( !empty( $_FILES ) )
    {
        //var_dump($_FILES);
        $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
        $ruta = "..". DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . 'Locales' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
        move_uploaded_file( $temporal, $ruta );
        echo "correcto";
    }
});

$app->post('/locales/{objeto}', function ($request, $response, $args) {
    
    $local = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    // if($local->foto!="pordefecto.png")
    // {
    //     $rutaVieja="../img/Locales/".$local->foto;
    //     $rutaNueva=$local->id_local.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
    //     copy($rutaVieja, "../img/".$rutaNueva);
    //     unlink($rutaVieja);
    //     $local->foto1=$rutaNueva;
    // }
    $datos = Local::NuevoLocal($local);
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
    
    $local = Local::TraerUnLocal($args['id']);

    unlink("../img/Locales/".$local->foto1);
    unlink("../img/Locales/".$local->foto2);
    unlink("../img/Locales/".$local->foto3);

    $datos = Local::BorrarLocal($args['id']);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});

//****************************************************************************************************************************//
//****************************************************************************************************************************//
$app->run();

// GET: lectura de recursos = TRAER LISTA DE OBJETOS
// POST: Para crear recursos = insertar objeto a la base de datos (actualizando nombre de la foto ya alojada en proyecto)
// PUT: Para editar recursos = modificar objeto en base de datos (incluyendo imagen)
// DELETE: Para eliminar recursos = Borrar objeto de la base de datos (incluyendo foto en carpeta img)
