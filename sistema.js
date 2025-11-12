class Sistema {
  constructor() {
    this.clientes = [];
    this.administradores = [];
    this.conciertos = [];
    this.reservas = [];
    this.usuarioLogueado = null;
    this.conciertoPreseleccionado = null;
  }

  //_____________________________ F01 - REGISTRO DE CLIENTE ___________________________________

  agregarUsuario(nombre, apellido, usuario, contrasena, confirmarContrasena) {
    // Validar que todos los campos están completos
    if (!nombre || !apellido || !usuario || !contrasena || !confirmarContrasena) {
      return "Todos los campos son obligatorios.";
    }

    // Validar que el usuario no existe
    if (existeProp(this.clientes, "usuario", usuario)) {
      return "El nombre de usuario ya existe.";
    }

    // Validar contraseña
    if (!validarContrasena(contrasena)) {
      return "Debe ingresar una contraseña válida.";
    }

    // Validar que las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
      return "Las contraseñas no coinciden.";
    }

    // Crear nuevo cliente con saldo inicial de 10000
    let nuevoCliente = new Cliente(obtenerIdCliente(), nombre, apellido, usuario, contrasena, 10000);
    this.clientes.push(nuevoCliente);
    return "Registro exitoso.";
  }

  //_____________________________ F02 - INICIO DE SESION __________________________________________________________

  iniciarSesion(usuario, contrasena) {
    // Validar campos vacíos
    if (!usuario || !contrasena) {
      return "Los campos no pueden estar vacíos";
    }

    // Buscar en administradores
    for (let i = 0; i < this.administradores.length; i++) {
      if (this.administradores[i].usuario.toLowerCase() === usuario.toLowerCase()) {
        if (this.administradores[i].contrasena === contrasena) {
          this.usuarioLogueado = this.administradores[i];
          return "Bienvenido " + this.usuarioLogueado.nombre;
        } else {
          return "Contraseña incorrecta";
        }
      }
    }

    // Buscar en clientes
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].usuario.toLowerCase() === usuario.toLowerCase()) {
        if (this.clientes[i].contrasena === contrasena) {
          this.usuarioLogueado = this.clientes[i];
          return "Bienvenido " + this.usuarioLogueado.nombre;
        } else {
          return "Contraseña incorrecta";
        }
      }
    }

    return "Usuario no encontrado";
  }

  //_____________________________ F0? - CIERRE DE SESION ______________________________________________

  cerrarSesion() {
    this.usuarioLogueado = null;
    return "Sesión cerrada";
  }

  //_________________________ F03 - EXPLORAR CONCIERTOS DISPONIBLES ____________________________________________________________________________

  explorarConciertosDisponibles() {
    let conciertosDisponibles = [];

    for (let i = 0; i < this.conciertos.length; i++) {
      if (this.conciertos[i].estado === "activo" && this.conciertos[i].cupos > 0) {
        conciertosDisponibles.push(this.conciertos[i]);
      }
    }

    return conciertosDisponibles;
  }

  //___________________________ F04 - RESERVAR ENTRADAS __________________________________________________

  solicitarReserva(clienteId, conciertoId, cantidad) {
    // Buscar cliente
    let cliente = null;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].id === clienteId) {
        cliente = this.clientes[i];
        break;
      }
    }

    // Buscar concierto
    let concierto = null;
    for (let i = 0; i < this.conciertos.length; i++) {
      if (this.conciertos[i].id === conciertoId) {
        concierto = this.conciertos[i];
        break;
      }
    }

    // Validar cantidad
    if (!validaCantidad(cantidad)) {
      return { exito: false, mensaje: "Cantidad inválida." };
    }

    // Validar que no tenga reserva previa (pendiente o aprobada)
    if (!puedeReservarEnLista(clienteId, conciertoId, this.reservas)) {
      return { exito: false, mensaje: "Ya tiene una reserva de este concierto." };
    }

    // Crear reserva pendiente
    let nuevaReserva = new Reserva(obtenerIdReserva(), cliente, concierto, cantidad, "pendiente");
    this.reservas.push(nuevaReserva);

    return { exito: true, mensaje: "Reserva pendiente de confirmación." };
  }

  //______________________________ F05 – HISTORIAL DE RESERVAS ______________________________________________

  listarReservasCliente(clienteId) {
    return filtrarReservasCliente(this.reservas, clienteId);
  }

  cancelarReserva(reservaId, clienteId) {
    for (let i = 0; i < this.reservas.length; i++) {
      let reserva = this.reservas[i];
      if (reserva.id === reservaId && reserva.cliente.id === clienteId) {
        if (reserva.estado === "pendiente") {
          reserva.estado = "cancelada";
          return { exito: true, mensaje: "Reserva cancelada." };
        } else {
          return { exito: false, mensaje: "La reserva fué aprobada, no es posible cancelar." };
        }
      }
    }
    return { exito: false, mensaje: "Reserva no encontrada." };
  }

  totalAprobadasCliente(clienteId) {
    let reservasCliente = this.listarReservasCliente(clienteId);
    return totalAprobadas(reservasCliente);
  }

  //______________________________ F06 – CONCIERTOS EN OFERTA ________________________________

  obtenerOfertas() {
    let resultado = [];
    for (let i = 0; i < this.conciertos.length; i++) {
      if (esOfertaActiva(this.conciertos[i])) {
        resultado.push(this.conciertos[i]);
      }
    }
    return resultado;
  }

  //______________________________ F07 – LISTAR Y PROCESAR RESERVAS ________________________________

  // Listar reservas por estado
  listarReservasPendientes() {
    let pendientes = [];
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].estado === "pendiente") {
        pendientes.push(this.reservas[i]);
      }
    }
    return pendientes;
  }

  listarReservasAprobadas() {
    let aprobadas = [];
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].estado === "aprobada") {
        aprobadas.push(this.reservas[i]);
      }
    }
    return aprobadas;
  }

  listarReservasCanceladas() {
    let canceladas = [];
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].estado === "cancelada") {
        canceladas.push(this.reservas[i]);
      }
    }
    return canceladas;
  }

  // Procesar reservas pendientes
  procesarReserva(reservaId, accion) {
    for (let i = 0; i < this.reservas.length; i++) {
      let reserva = this.reservas[i];

      if (reserva.id === reservaId) {
        if (reserva.estado !== "pendiente") {
          return { exito: false, mensaje: "La reserva ya fue procesada." };
        }

        if (accion === "aprobar") {
          // Validar concierto activo
          if (reserva.concierto.estado !== "activo") {
            reserva.estado = "cancelada";
            return { exito: false, mensaje: "El concierto no está activo. Reserva cancelada." };
          }

          // Validar cupos suficientes
          if (reserva.concierto.cupos < reserva.cantidad) {
            reserva.estado = "cancelada";
            return { exito: false, mensaje: "No hay cupos suficientes. Reserva cancelada." };
          }

          // Calcular monto con descuento (10% si cantidad >= 4)
          let monto = reserva.montoConDescuento();

          // Validar saldo suficiente
          if (reserva.cliente.saldo < monto) {
            reserva.estado = "cancelada";
            return { exito: false, mensaje: "Saldo insuficiente. Reserva cancelada." };
          }

          // Aprobar reserva
          reserva.cliente.saldo = reserva.cliente.saldo - monto;
          reserva.concierto.cupos = reserva.concierto.cupos - reserva.cantidad;
          reserva.estado = "aprobada";

          // Si cupos llegan a 0, pausar concierto
          if (reserva.concierto.cupos === 0) {
            reserva.concierto.estado = "pausado";
          }

          return { exito: true, mensaje: "Reserva aprobada." };
        } else if (accion === "cancelar") {
          reserva.estado = "cancelada";
          return { exito: true, mensaje: "Reserva cancelada." };
        }
      }
    }
    return { exito: false, mensaje: "Reserva no encontrada." };
  }

  //______________________________ F08 – AGREGAR CONCIERTOS ________________________________

  agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, estado, oferta) {
    let nuevoConcierto = new Concierto(obtenerIdConcierto(), nombre, artista, precio, descripcion, imagen, cupos, estado, oferta);
    this.conciertos.push(nuevoConcierto);
  }

  //______________________________ F09 – ADMINISTRAR CONCIERTOS ________________________________

  actualizarConcierto(idConcierto, cambios) {
    for (let i = 0; i < this.conciertos.length; i++) {
      let concierto = this.conciertos[i];

      if (concierto.id === idConcierto) {
        // Actualizar cupos
        if (cambios.cupos !== undefined) {
          concierto.cupos = cambios.cupos;
          // Si cupos llegan a 0, pausar automáticamente
          if (concierto.cupos === 0) {
            concierto.estado = "pausado";
          }
        }

        // Actualizar estado
        if (cambios.estado !== undefined) {
          // No permitir activar si no hay cupos
          if (cambios.estado === "activo" && concierto.cupos === 0) {
            concierto.estado = "pausado";
          } else {
            concierto.estado = cambios.estado;
          }
        }

        // Actualizar oferta
        if (cambios.oferta !== undefined) {
          concierto.oferta = cambios.oferta;
        }

        return { exito: true, mensaje: "Concierto actualizado." };
      }
    }
    return { exito: false, mensaje: "Concierto no encontrado." };
  }

  //______________________________ F10 – INFORME DE GANANCIAS ________________________________

  calcularGanancias() {
    let total = 0;
    let detalle = {};

    for (let i = 0; i < this.reservas.length; i++) {
      let reserva = this.reservas[i];

      if (reserva.estado === "aprobada") {
        let monto = reserva.montoConDescuento();
        total = total + monto;

        let conciertoId = reserva.concierto.id;

        // Si no existe el concierto en el detalle, crearlo
        if (!detalle[conciertoId]) {
          detalle[conciertoId] = {
            nombre: reserva.concierto.nombre,
            cantidad: 0,
            monto: 0,
          };
        }

        // Sumar cantidad y monto
        detalle[conciertoId].cantidad = detalle[conciertoId].cantidad + reserva.cantidad;
        detalle[conciertoId].monto = detalle[conciertoId].monto + monto;
      }
    }

    return { total: total, detalle: detalle };
  }
}
