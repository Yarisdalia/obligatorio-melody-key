//Funciones reutilizables

// ------------------- SIEXISTE PROPIEDAD --------------------
function existeProp(array, propiedad, valor) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][propiedad].toLowerCase() === valor.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// ------------------- OBTENER STRING DE BOOLEANO --------------------
// Creamos esta función para poder obtener el texto ("Si, No"), del parámetro 'Oferta'.
// Y así poder llevarlo a tablas dinámicas de los conciertos.

function obtenerTexto(valor) {
  if (valor === true) {
    return "Si";
  } else {
    return "No";
  }
}

// ------------------- VALIDACIONES RESERVAR --------------------

function validaCantidad(cantidad) {
  return cantidad > 0;
}

function validaCupos(cantidad, cupos) {
  if (cupos <= 0) {
    return false;
  }
  return cantidad <= cupos;
}

function puedeReservarEnLista(clienteId, conciertoId, reservas) {
  if (!reservas) {
    return true;
  }
  for (let i = 0; i < reservas.length; i++) {
    let reservaActual = reservas[i];
    if (reservaActual) {
      if (reservaActual.cliente && reservaActual.concierto) {
        if (
          reservaActual.cliente.id === clienteId &&
          reservaActual.concierto.id === conciertoId
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

// ------------------- VALIDACIONES  HISTORIAL -------------------------------------

function filtrarReservasCliente(reservas, clienteId) {
  let resultado = [];
  if (!reservas) {
    return resultado;
  }
  for (let i = 0; i < reservas.length; i++) {
    let reservaActual = reservas[i];
    if (reservaActual) {
      if (reservaActual.cliente) {
        if (reservaActual.cliente.id === clienteId) {
          resultado.push(reservaActual);
        }
      }
    }
  }
  return resultado;
}

function totalAprobadas(reservasCliente) {
  let total = 0;
  if (!reservasCliente) {
    return 0;
  }
  for (let i = 0; i < reservasCliente.length; i++) {
    let reservaActual = reservasCliente[i];
    if (reservaActual) {
      if (reservaActual.estado === "aprobada") {
        let montoReserva = 0;
        if (reservaActual.montoTotal) {
          montoReserva = reservaActual.montoTotal();
        } else if (reservaActual.concierto && reservaActual.cantidad) {
          montoReserva =
            reservaActual.concierto.precio * reservaActual.cantidad;
        }
        // Aplicar descuento del 10% si la cantidad es 4 o más
        if (reservaActual.cantidad >= 4) {
          montoReserva = Math.floor(montoReserva * 0.9);
        }
        total = total + montoReserva;
      }
    }
  }
  return total;
}

// ------------------- VALIDACIONES CONCIERTOS EN OFERTA ---------------------------

function esActivo(concierto) {
  if (!concierto) {
    return false;
  }
  return concierto.estado === "activo";
}

function esOfertaActiva(concierto) {
  if (!concierto) {
    return false;
  }
  if (!esActivo(concierto)) {
    return false;
  }
  if (!(concierto.oferta === true)) {
    return false;
  }
  if (!(concierto.cupos > 0)) {
    return false;
  }
  return true;
}
