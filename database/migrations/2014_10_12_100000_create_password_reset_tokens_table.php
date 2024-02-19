<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Crear la tabla 'password_reset_tokens'
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            // Columna de correo electrónico como clave primaria
            $table->string('email')->primary();

            // Columna para almacenar el token de restablecimiento de contraseña
            $table->string('token');

            // Columna para la marca de tiempo de creación del token (puede ser nula)
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Eliminar la tabla 'password_reset_tokens' si existe
        Schema::dropIfExists('password_reset_tokens');
    }
};

