<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HorarioDisponible;

class HorariosDisponiblesController extends Controller
{
    public function index()
    {
        // Obtener los horarios disponibles que no están ocupados
        $horariosDisponibles = HorarioDisponible::where('ocupado', true)->get();

        // Verificar si se encontraron horarios disponibles
        if ($horariosDisponibles->isEmpty()) {
            // Si no se encontraron horarios disponibles, devolver un mensaje de error
            return response()->json(['message' => 'No hay horarios disponibles'], 404);
        }

        // Devolver los horarios disponibles
        return response()->json($horariosDisponibles);
    }
}
