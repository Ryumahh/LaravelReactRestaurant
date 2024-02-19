<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles de la reserva</title>
</head>
<body>
    <h2>Detalles de la reserva</h2>
    <p>Nombre: {{ $reserva->Nombre }}</p>
    <p>Fecha: {{ $reserva->fecha }}</p>
    <p>Tarjeta de crédito: {{ $tarjetaCredito }}</p>
</body>
</html>
