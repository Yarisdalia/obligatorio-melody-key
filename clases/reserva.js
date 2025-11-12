class Reserva {
  constructor(id, cliente, concierto, cantidad, estado) {
    this.id = id;
    this.cliente = cliente; // Objeto Cliente
    this.concierto = concierto; // Objeto Concierto
    this.cantidad = cantidad;
    this.estado = estado; // pendiente, aprobada, cancelada
  }

  montoTotal() {
    return this.cantidad * this.concierto.precio;
  }

  montoConDescuento() {
    let total = this.montoTotal();
    // Aplicar 10% de descuento si cantidad >= 4
    if (this.cantidad >= 4) {
      total = total * 0.9;
    }
    return total;
  }
}
