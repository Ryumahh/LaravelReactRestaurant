<?php

namespace App\Http\Controllers\Api;

use App\Models\Reserva;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


use App\Models\HorarioDisponible;

class AccountController extends Controller
{
    public function mostrarDatos(Request $request){

    try {
        // Se obtiene el usuario autenticado directamente
        $user = Auth::user();

        // Obtenemos información del usuario con sus reservas relacionadas
        $reservas =Reserva::where('User_id', $request->id)->get();

        // Devolvemos una respuesta JSON con los datos del usuario y un mensaje de confirmación
        return response()->json([
            'status' => true,
            'message' => 'Reservas del usuario obtenidas correctamente',
            'user' => $reservas,
        ], 200);

    } catch (\Throwable $th) {
        // Capturar cualquier excepción ocurrida y devolver una respuesta JSON de error
        return response()->json([
            'status' => false,
            'message' => $th->getMessage(),
        ], 500);
    }
}


public function borrarDatos(Request $request)
{
    try {
        // Eliminar la reserva con el ID proporcionado
        $reserva = Reserva::findOrFail($request->id);
        $reserva->delete();

        // Obtener la fecha de la reserva eliminada
        $fechaReserva = date('Y-m-d', strtotime($reserva->fecha));

        // Marcar en la tabla de horarios disponibles como ocupada (1)
        $horariosDisponibles = HorarioDisponible::where('fecha', $fechaReserva)->get();

        // Marcar como ocupados los horarios correspondientes
        foreach ($horariosDisponibles as $horario) {
            $horario->update(['ocupado' => 1]);
        }

        // Devolver una respuesta JSON exitosa
        return response()->json([
            'status' => true,
            'message' => 'Reserva eliminada correctamente y horarios actualizados',
        ], 200);
    } catch (\Throwable $th) {
        // Capturar cualquier excepción ocurrida y devolver una respuesta JSON de error
        return response()->json([
            'status' => false,
            'message' => $th->getMessage(),
        ], 500);
    }
}


}