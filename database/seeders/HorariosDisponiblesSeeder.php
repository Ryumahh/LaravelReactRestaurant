<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HorarioDisponible;

class HorariosDisponiblesSeeder extends Seeder
{
    public function run()
    {
        // Obtener la fecha de hoy
        $hoy = now()->toDateString();
        // Obtener la fecha de mañana
        $mañana = now()->addDay()->toDateString();
        // Obtener la fecha de pasado mañana
        $pasadoMañana = now()->addDays(2)->toDateString();

        // Crear horario disponible para hoy a las 9:00 AM
        HorarioDisponible::create([
            'fecha' => $hoy,
            'hora' => '09:00:00',
            'ocupado' => true,
        ]);

        // Crear horario disponible para mañana a las 2:00 PM
        HorarioDisponible::create([
            'fecha' => $mañana,
            'hora' => '14:00:00',
            'ocupado' => true,
        ]);

        // Crear horario disponible para pasado mañana a las 5:00 PM
        HorarioDisponible::create([
            'fecha' => $pasadoMañana,
            'hora' => '17:00:00',
            'ocupado' => true,
        ]);
    }
}
