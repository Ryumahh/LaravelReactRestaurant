<?php

namespace App\Mail;

use App\Models\Reserva;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservaCreada extends Mailable
{
    use Queueable, SerializesModels;

    public $reserva;
    public $tarjetaCredito;

    public function __construct(Reserva $reserva, $tarjetaCredito)
    {
        $this->reserva = $reserva;
        $this->tarjetaCredito = $tarjetaCredito;
    }

    public function build()
    {
        return $this->view('mails.reserva-creada');
    }
}
