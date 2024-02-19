<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        // Aquí se crea la tabla 'reservas'
        Schema::create('reservas', function (Blueprint $table) {
            // Columna de identificación única
            $table->id();
            $table->date('fecha');
            $table->string('Nombre');
            $table->string('Email');
            // Permitir valores nulos
            $table->unsignedBigInteger('user_id')->nullable();
            // Clave foránea para 'user_id', que hace referencia a la columna 'id' en la tabla 'users'
            $table->foreign('user_id') 
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
