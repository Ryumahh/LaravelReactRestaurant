<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('horario_disponibles', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->time('hora');
            $table->boolean('ocupado')->default(false); // Columna para indicar si el horario está ocupado
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('horario_disponibles');
    }
};
