<?php

/*IMPORTANTE: actualizar la ruta si se cambia la carpeta que aloja al web service */

require 'vendor/autoload.php';
require 'PHP/clases/Usuarios.php';
require 'PHP/clases/Entidades.php';

$app = new Slim\App();

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

//GET: lectura de recursos = TRAER LISTA DE OBJETOS
$app->get('/entidades[/]', function ($request, $response, $args) {
    $datos = entidad::TraerTodasLasEntidades();
    $response->write(json_encode($datos));
    //INTERNAL SERVER ERROR 500 -> Porque le estaba devolviendo una referencia a memoria del servidor (hay que pasar un "string" del objeto transformado a json!!)
    
    return $response;
});

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $datos = Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($datos));
    return $response;
});

// $app->get('/usuarios/{objeto}', function ($request, $response, $args) {
//     $datos = Usuario::TraerTodosLosClientes();
//     $response->write(json_encode($datos));
//     return $response;
// });

// POST: Para crear recursos = mover foto de la ubicación temporal hacia la carpeta de imagenes del proyecto.
$app->post('/altaFoto[/]', function ($request, $response, $args) {

    if ( !empty( $_FILES ) )
    {
        $temporal = $_FILES[ 'file' ][ 'tmp_name' ];
        $ruta = "..". DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
        move_uploaded_file( $temporal, $ruta );
        echo "correcto";
    }
});

// POST: Para crear recursos = insertar objeto a la base de datos (actualizando nombre de la foto ya alojada en proyecto)
$app->post('/entidades/{objeto}', function ($request, $response, $args) {
    
    $entidad = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    
    $datos = entidad::InsertarEntidad($entidad);
    $response->write($datos);
    return $response;
});

$app->post('/usuarios/{objeto}', function ($request, $response, $args) {
    
    $usuario = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    
    $datos = Usuario::InsertarUsuario($usuario);
    $response->write($datos);
    return $response;
});

// PUT: Para editar recursos = modificar objeto en base de datos (incluyendo imagen)
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

$app->put('/usuarios/{objeto}', function ($request, $response, $args) {
    $usuario = json_decode($args['objeto']);
    echo "<br>DATOS!: " . $args['objeto'];
    $datos = Usuario::ModificarUsuario($usuario);
    //$response->write($datos);
    return $response;
});

// DELETE: Para eliminar recursos = Borrar objeto de la base de datos (incluyendo foto en carpeta img)
$app->delete('/entidades/{numero}', function ($request, $response, $args) {
    
    $datos = entidad::BorrarEntidad($args['numero']);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});

$app->delete('/usuarios/{id}', function ($request, $response, $args) {
    
    //$usuario = Usuario::TraerUnUsuario($args['id']);
    $datos = Usuario::BorrarUsuario($args['id']);
    $response->write("borrar !: ");
    //var_dump($args);
    return $response;
});

$app->run();
