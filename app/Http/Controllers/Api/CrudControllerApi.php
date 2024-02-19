<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Reserva;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\HorarioDisponible;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservaCreada;

class CrudControllerApi extends Controller
{
    public function mostrarDatos(Request $request)
    {
        try {
            // Se obtiene el usuario autenticado
            $user = Auth::user();

            // Verificamos las credenciales del usuario utilizando la contraseña proporcionada en la solicitud
            if ($user && Hash::check($request->password, $user->password)) {

                // Obtenemos información del usuario con sus reservas relacionadas 
                $usuario = User::with('Reserva')->find($user->id);

                // Devolvemos una respuesta JSON con los datos del usuario y un mensaje de confirmacion
                return response()->json([
                    'status' => true,
                    'message' => 'Datos del usuario obtenidos correctamente',
                    'user' => $usuario,
                ], 200);
            } else if (!isset($request->password)) {

                $reserva = Reserva::all();
                return response()->json([
                    'status' => true,
                    'message' => 'Datos de las reservas obtenidos correctamente',
                    'user' => $reserva,
                ], 200);
            } else {
                // Devolvemos una respuesta JSON de error si las credenciales son inválidas
                return response()->json([
                    'status' => false,
                    'message' => 'Credenciales inválidas',
                ], 401);
            }
        } catch (\Throwable $th) {
            // Capturar cualquier excepción ocurrida y devolver una respuesta JSON de error
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    
    public function insertarDatos(Request $request){
    try {
        // Obtener la información del usuario actual desde la solicitud
        $userId = $request->userId;

        // Crear una instancia de la clase Reserva
        $reserva = new Reserva();
        
        // Establecer valores para los campos de la reserva
        $reserva->fecha = $request->fecha;
        $reserva->Nombre = $request->nombre;
        $reserva->Email = $request->email;

        // Obtener la tarjeta de crédito de la solicitud
        $tarjetaCredito = $request->tarjetaCredito;

        // Guardar la reserva en la base de datos
        $reserva->save();

        // Obtener la dirección de correo electrónico del formulario
        $emailDestinatario = $request->email;

        // Enviar un correo electrónico con los detalles de la reserva al destinatario proporcionado en el formulario
        Mail::to($emailDestinatario)->send(new ReservaCreada($reserva, $tarjetaCredito));

        // Si hay un userId válido, asignarlo a la reserva
        if ($userId) {
            $reserva->user_id = $userId;
            $reserva->save();
        }

        // Marcar en la tabla de horarios disponibles como ocupada (1)
        $fechaReserva = date('Y-m-d', strtotime($request->fecha));
        
        // Buscar los registros correspondientes en la tabla de horarios disponibles
        $horariosDisponibles = HorarioDisponible::where('fecha', $fechaReserva)->get();
        
        // Marcar como ocupados los horarios de la reserva
        foreach ($horariosDisponibles as $horario) {
            $horario->ocupado = 0; // Marcar como ocupado
            $horario->save();
        }

        // Devolver una respuesta JSON para confirmar que se ha guardado correctamente
        return response()->json([
            'status' => true,
            'message' => 'Reserva realizada correctamente. Se ha enviado un correo electrónico con los detalles de la reserva.',
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
            // Obtenemos el usuario autenticado
            $user = Auth::user();

            // Verificamos si el usuario no está autenticado
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Usuario no autenticado',
                ], 401);
            }

            // Elimina la reserva con el ID proporcionado y que pertenezca al usuario autenticado
            Reserva::where('id', $request->id)
                ->where('user_id', $user->id)
                ->delete();

            // Devuelve una respuesta JSON exitosa
            return response()->json([
                'status' => true,
                'message' => 'Reserva eliminada correctamente',
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

