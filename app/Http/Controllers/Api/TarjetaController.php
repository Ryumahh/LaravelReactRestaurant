<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tarjeta;

class TarjetaController extends Controller
{
    public function index()
    {
        $tarjetas = Tarjeta::all();
        return response()->json($tarjetas);
    }

    public function store(Request $request)
    {
        // Validar la solicitud
        $request->validate([
            'numero' => 'required',
            'tipo' => 'required'
        ]);

        // Crear la tarjeta
        $tarjeta = Tarjeta::create($request->all());

        return response()->json($tarjeta, 201);
    }

    public function destroy($id)
    {
        $tarjeta = Tarjeta::findOrFail($id);
        $tarjeta->delete();

        return response()->json(null, 204);
    }
}
