<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Tarjeta extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero',
        'tipo',
        'user_id',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}
