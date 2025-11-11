class Cliente {
  constructor(id, nombre, apellido, usuario, contrasena, saldo) {
    this.id = id; // id auto incremental
    this.nombre = nombre;
    this.apellido = apellido;
    this.usuario = usuario; // Nombre de usuario
    this.contrasena = contrasena;
    this.saldo = saldo;
  }

  siSeQuedasConSaldo(monto) {
    return this.saldo >= monto;
  }

  descontarSaldo(monto) {
    this.saldo = this.saldo - monto;
  }
}
