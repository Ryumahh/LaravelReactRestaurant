<?php

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PruebaController;
use App\Http\Controllers\CrudController;
use App\Http\Mail\EnviarCorreo;
use App\Models\Reserva;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//Esta ruta nos redirige a la vista del index desde cualquier punto de la raiz de la aplicacion 
Route::get('/', function () {
    return view('pagPrincipal'); 
});

//procesar los eventos de la aplicacion desde el controlador con la funcion de nombre index
Route::get('/Event',[PruebaController::class, 'index']);

// De la pagina principal a la vista del fullcalendar
Route::get('/pagPrincipal', function () {
    return view('index');
})->name('reservar');
 
//Pasa la variable fechaHora al controdor con la funcion fechas para procesarla
Route::get('/contact/{fechaHora}',[PruebaController::class, 'fechas']);
//variables del formulario de reserva mandadas al controlador 
Route::post('/contact/{fechaHora}/{nombre}/{mensaje}/{asunto}/{email}', [CrudController::class, 'crudCreate']);

//Esta funcion sirve para mandar el correo electronico
//se cogen los datos del formualrio(/contact), se le especifica el correo electronico al que se le va enviar el correo(Mail::to('pruebas63582@gmail.com'))
//el contenido del correo electronico se coge atravez de unos datos request del formulario y se pasan como atributos de un nuevo objeto de la clase Enviarcorreo(send(new EnviarCorreo(request()->mensaje)
//si todo sale bien la funcion con nombre enviar-correo devuelve un mensaje(return "Se ha enviado correctamente)
Route::get('/contact', function(Request $request){
    $crudController = new CrudController();
    $crudController->crudCreate(request()->nombre,request()->mensaje,request()->asunto,request()->email);
    Mail::to(request()->email)->send(new EnviarCorreo(request()->mensaje,request()->asunto,request()->email,request()->nombre,request()->fechaHora));
    return "Se ha enviado una notificacion a su correo y su reserva a quedado registrada";
})->name('form');

// Ruta para borrar una reserva
Route::get('/tusReservas/{id}', [CrudController::class, 'crudDelete'])->name('borrar');

// Ruta para mostrar las reservas
Route::get('/tusReservas', [CrudController::Class, "crudMostrar"]);
Route::get('/tusReservas', function(Request $request){
    $mostrarDatos = Reserva::all();
    return view("/tusReservas")->with("mostrarDatos", $mostrarDatos);
})->name('editar');


//Ruta para editar la reserva
Route::get('/tusReservas/{id}/{nombre}/{mensaje}/{asunto}/{email}', [CrudController::class, 'crudEditar']);





