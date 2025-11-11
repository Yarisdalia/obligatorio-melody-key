class Reserva {
  constructor(id, cliente, concierto, cantidad, estado) {
    this.id = id; // id auto incremental
    this.cliente = cliente; // objeto Cliente
    this.concierto = concierto; // objeto Concierto
    this.cantidad = cantidad; // cantidad de cupos
    this.estado = estado; // pendiente, aprobada, cancelada
  }

  montoTotal() {
    return this.cantidad * this.concierto.precio;
  }

  montoConDescuento() {
    let total = this.montoTotal();
    if (this.cantidad >= 4) {
      total = total * 0.9; // aplicar descuento del 10%
    }
    return total;
  }
}
