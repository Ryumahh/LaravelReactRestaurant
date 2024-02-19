<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CrudControllerApi;

use App\Http\Controllers\Api\HorariosDisponiblesController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\TarjetaController;
use App\Http\Controllers\Api\AccountController;

// Ruta para mostrar los datos de las reservas 
Route::get('/mostrar', [CrudControllerApi::class, 'mostrarDatos']);

// Ruta para borrar una reserva 
Route::delete('/borrar', [AccountController::class, 'borrarDatos']);

Route::get('/horarios-disponibles', [HorariosDisponiblesController::class, 'index']);

Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);

Route::post('/insertar-datos', [CrudControllerApi::class, 'insertarDatos']);

Route::get('/tarjetas', [TarjetaController::class, 'index']);
Route::post('/tarjetas', [TarjetaController::class, 'store']);
Route::delete('/tarjetas/{id}', [TarjetaController::class, 'destroy']);