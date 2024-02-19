<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Reserva;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // "hasMany" para permitir que un usuario tenga varias reservas
    public function reservas()
    {
        return $this->hasMany(Reserva::class);

    }

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
