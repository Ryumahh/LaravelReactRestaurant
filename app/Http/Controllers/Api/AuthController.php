<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */
     public function createUser(Request $request)
    {
        try {
            // Valildamos los datos de la solicitud
            $validateUser = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            // Verificamos si la validación falla y devolver errores si es así
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            // Crea un nuevo usuario con los datos proporcionados
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            // Devuelve una respuesta JSON exitosa con un mensaje y el token de acceso generado
            return response()->json([
                'status' => true,
                'message' => 'Usuario creado exitosamente',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            // Capturar cualquier excepción ocurrida y devolver una respuesta JSON de error
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    /**
     * Login The User
     * @param Request $request
     * @return User
     */
     public function loginUser(Request $request)
    {
        try {
            // Validamos los datos de la solicitud
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            // Verificamos si la validación falla y devolvemos errores si es así
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            // Intentamos autenticar al usuario utilizando las credenciales proporcionadas
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email y contraseña no son válidos',
                ], 401);
            }

            // Obtiene el usuario autenticado
            $user = User::where('email', $request->email)->first();

            // Devolve una respuesta JSON exitosa con un mensaje y el token de acceso generado
            return response()->json([
                'status' => true,
                'message' => 'Usuario logueado correctamente',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            // Capturar cualquier excepción ocurrida y devolver una respuesta JSON de error
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }



}
