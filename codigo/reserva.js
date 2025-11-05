class Reserva
{
    constructor(id, cliente, concierto, cantidad, estado)
    {
        this.id = id;                 // id autoincremental
        this.cliente = cliente;       // objeto Cliente
        this.concierto = concierto;   // objeto Concierto
        this.cantidad = cantidad;     // cantidad de cupos
        this.estado = estado;         // pendiente, aprobada, cancelada
    }

    montoTotal()
    {
        return this.cantidad * this.concierto.precio;
    }
}