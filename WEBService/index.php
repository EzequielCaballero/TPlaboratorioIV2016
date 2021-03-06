<?php

//HABILITACION DE CORS EN EL SERVIDOR
use Slim\Http\Headers;
header("Access-Control-Allow-Origin: *");
header('Content-Type: image/jpeg');
/*IMPORTANTE: actualizar la ruta si se cambia la carpeta que aloja al web service */

include_once 'PHP/clases/Usuarios.php';
include_once 'PHP/clases/Locales.php';
include_once 'PHP/clases/Ofertas.php';
include_once 'PHP/clases/Productos.php';
include_once 'PHP/clases/Operaciones.php';
include_once 'PHP/clases/Compras.php';
include_once 'PHP/clases/Reservas.php';
include_once 'PHP/clases/Encuestas.php';
include_once 'PHP/clases/Registro_sesiones.php';

require 'vendor/autoload.php';

$app = new Slim\App(['settings' => ['displayErrorDetails' => true]]);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost/1A-TP_PIZZERIA')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

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

    //CASO DE DAR DE ALTA UN ENCARGADO
    if($usuario->tipo_user == "encargado")
    {
        //El anterior encargado pasa a ser empleado de dicho local
        $cambioAnteriorEncargado = Usuario::CambioCategoriaPorLocal($usuario->id_local, "encargado", "empleado");
        //El nuevo usuario queda como nuevo encargado
        $cambioJefeEnLocal = Local::CambiarEncargadoLocal($usuario);
    }
    $datos = Usuario::InsertarUsuario($usuario);
    $response->write($datos);
    return $response;
});

$app->put('/usuarios/{objeto}', function ($request, $response, $args) {
    $usuario = json_decode($args['objeto']);
    
    if(!isset($usuario->nombre))
    {
        if(isset($usuario->id_local))
            $datos = Usuario::CambiarLocalUsuario($usuario);
        else
            $datos = Usuario::CambiarEstadoUsuario($usuario);
    }
    else
        $datos = Usuario::ModificarUsuario($usuario);
    
    
    $response->write(json_encode($datos));
    return $response;
});

$app->delete('/usuarios/{id}', function ($request, $response, $args) {
    
    //$usuario = Usuario::TraerUnUsuario($args['id']);
    $id_usuario = json_decode($args['id']);
    $datos = Usuario::BorrarUsuario($id_usuario);
    $response->write($datos);
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
    
    $parametro = json_decode($args['objeto']);
    if(isset($parametro->cambio))
    {    
        if($parametro->cambio == "direccion")
            $datos = Local::ModificarDireccion($parametro);
        if($parametro->cambio == "encargado")
        {
            //El anterior encargado pasa a ser empleado de dicho local
            $cambioAnteriorEncargado = Usuario::CambioCategoriaPorLocal($parametro->id_local, "encargado", "empleado");
            $cambioActualEmpleado = Usuario::CambioCategoriaEmpleado($parametro->nuevoEncargado, $parametro->id_local, "encargado");
            $datos = Local::ModificarEncargado($parametro);
        }
    }
    else
        $datos = Local::ModificarLocal($parametro); 

    $response->write(json_encode($datos));
    return $response;
});

$app->delete('/locales/{id}', function ($request, $response, $args) {
    
    $id_local = json_decode($args['id']);
    $local = Local::TraerUnLocal($id_local);

    // $foto_1 = "../img/Locales/".$local->foto1;
    // $foto_2 = "../img/Locales/".$local->foto2;
    // $foto_3 = "../img/Locales/".$local->foto3;
    // unlink($foto_1);
    // unlink($foto_2);
    // unlink($foto_3);

    $datos = Local::BorrarLocal($id_local);
    $empleadosLibres = Usuario::LiberarUsuariosDeLocal($id_local);
    $ofertasLocal = Oferta::desvincularOfertasALocal($id_local);
    $response->write($local);
    //var_dump($args);
    return $response;
});

//**************************************************************OFERTAS**************************************************************//
$app->get('/ofertas[/]', function ($request, $response, $args) {
    $datos = Oferta::TraerTodosLasOfertas();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/ofertas/{parametro}', function ($request, $response, $args) {
    $parametro = json_decode($args['parametro']);
    if($parametro == "masVendida")
        $datos = Oferta::TraerOfertaMasVendida();
    else
        $datos = Oferta::TraerOfertaSegunLocal($parametro);
    $response->write(json_encode($datos));
    return $response;
});

//*************************************************************PRODUCTOS*************************************************************//
$app->get('/productos[/]', function ($request, $response, $args) {
    $datos = Producto::TraerTodosLosProductos();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/productos/{parametro}', function ($request, $response, $args) {
    $parametro = json_decode($args['parametro']);
    if($parametro == "masVendido")
        $datos = Producto::TraerProductoMasVendido();
    else
        $datos = Producto::TraerProductosDeOferta($parametro);
    $response->write(json_encode($datos));
    return $response;
});
//************************************************************OPERACIONES************************************************************//
$app->get('/operaciones[/]', function ($request, $response, $args) {
    $datos = Operacion::TraerTodasLasOperaciones();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/operaciones/{parametro}', function ($request, $response, $args) {
    $parametro = json_decode($args['parametro']);
    $datos = Operacion::TraerOperacionesPorUsuario($parametro);
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/operaciones/{objeto}', function ($request, $response, $args) {
    
    $operacion = json_decode($args['objeto']);

    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Operacion::traerUltimaFila();
    $nuevaFila = $ultimoID + 1;
    $operacion->id_operacion = $nuevaFila;
    //AGREGAR NUEVA OPERACION
    $datos = Operacion::AgregarOperacion($operacion);
    $response->write($datos);
    return $response;
});

//**************************************************************COMPRAS**************************************************************//
$app->get('/compras[/]', function ($request, $response, $args) {
    $datos = Compra::TraerTodasLasCompras();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/compras/{parametro}', function ($request, $response, $args) {
    $parametro = json_decode($args['parametro']);
    $datos = Compra::TraerCiertasCompras($parametro);
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/compras/{objeto}', function ($request, $response, $args) {
    
    $compra = json_decode($args['objeto']);

    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Compra::traerUltimaFila();
    $nuevaFila = $ultimoID + 1;
    $compra->id_compra = $nuevaFila;
    //DEFINIR ID operacion asociada
    $ultimoID_operacion = Operacion::traerUltimaFila();
    $id_operacion = $ultimoID_operacion + 1;
    //AGREGAR NUEVA COMPRA
    $datos = Compra::AgregarCompra($compra, $id_operacion);
    
    //ASOCIAR COMPRA A OFERTAS/PRODUCTOS
    if(count($compra->ofertasAsociadas)!=0)
        $c_ofertas = Compra::AsociarCompraAofertas($compra->id_compra, $compra->ofertasAsociadas);
    if(count($compra->productosAsociados)!=0)
        $c_productos = Compra::AsociarCompraAproductos($compra->id_compra, $compra->productosAsociados);

    $response->write($datos);
    return $response;
});
//*************************************************************RESERVAS*************************************************************//
$app->get('/reservas[/]', function ($request, $response, $args) {
    $datos = Reserva::TraerTodasLasReservas();
    $response->write(json_encode($datos));
    return $response;
});

$app->get('/reservas/{parametro}', function ($request, $response, $args) {
    $parametro = json_decode($args['parametro']);
    $datos = Reserva::TraerCiertasReservas($parametro);
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/reservas/{objeto}', function ($request, $response, $args) {
    
    $reserva = json_decode($args['objeto']);

    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Reserva::traerUltimaFila();
    $nuevaFila = (int)$ultimoID + 1;
    $reserva->id_reserva = $nuevaFila;
    //DEFINIR ID operacion asociada
    $ultimoID_operacion = Operacion::traerUltimaFila();
    $id_operacion = (int)$ultimoID_operacion + 1;
    //AGREGAR NUEVA RESERVA
    $datos = Reserva::AgregarReserva($reserva, $id_operacion);

    //ASOCIAR RESERVA A OFERTAS/PRODUCTOS
    if(count($reserva->ofertasAsociadas)!=0)
        $r_ofertas = Reserva::AsociarReservaAofertas($reserva->id_reserva, $reserva->ofertasAsociadas);
    if(count($reserva->productosAsociados)!=0)
        $r_productos = Reserva::AsociarReservaAproductos($reserva->id_reserva, $reserva->productosAsociados);

    $response->write($datos);
    return $response;
});
//*************************************************************ENCUESTAS*************************************************************//
$app->get('/encuestas[/]', function ($request, $response, $args) {
    $datos = Encuesta::TraerTodasLasEncuestas();
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/encuestas/{objeto}', function ($request, $response, $args) {
    
    $encuesta = json_decode($args['objeto']);

    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Encuesta::traerUltimaFila();
    $nuevaFila = $ultimoID + 1;
    $encuesta->id_encuesta = $nuevaFila;
    //AGREGAR NUEVA ENCUESTA
    $datos = Encuesta::AgregarEncuesta($encuesta);

    $response->write($datos);
    return $response;
});

//*************************************************************REGISTROS*************************************************************//
$app->get('/registro_sesiones[/]', function ($request, $response, $args) {
    $datos = Registro_sesiones::TraerTodosLosRegistros();
    $response->write(json_encode($datos));
    return $response;
});

$app->post('/registro_sesiones/{objeto}', function ($request, $response, $args) {
    
    $registro = json_decode($args['objeto']);
    //DEFINICION DE ID (Autoincremental)
    $ultimoID = Registro_sesiones::traerUltimaFila();
    $nuevaFila = $ultimoID + 1;
    $registro->id_registro = $nuevaFila;
    //AGREGAR NUEVO REGISTRO DE SESION
    $datos = Registro_sesiones::agregarNuevoRegistro($registro);

    $response->write($datos);
    return $response;
});

//****************************************************************************************************************************//
//****************************************************************************************************************************//
$app->run();

// GET: lectura de recursos = TRAER LISTA DE OBJETOS
// POST: Para crear recursos = insertar objeto a la base de datos (actualizando nombre de la foto ya alojada en proyecto)
// PUT: Para editar recursos = modificar objeto en base de datos (incluyendo imagen)
// DELETE: Para eliminar recursos = Borrar objeto de la base de datos (incluyendo foto en carpeta img)
