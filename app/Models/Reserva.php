<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Reserva extends Model
{
    protected $table = 'reservas';
    
    protected $fillable = ['fecha', 'Nombre', 'Email', 'user_id'];

    public $timestamps = false;
}

