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

function puedeReservarEnLista(clienteId, conciertoId, reservas) {
  for (let i = 0; i < reservas.length; i++) {
    let reservaActual = reservas[i];
    if (reservaActual.cliente.id === clienteId && reservaActual.concierto.id === conciertoId) {
      // Solo bloquear si tiene reserva pendiente o aprobada
      if (reservaActual.estado === "pendiente" || reservaActual.estado === "aprobada") {
        return false;
      }
    }
  }
  return true;
}

// ------------------- VALIDACIONES  HISTORIAL -------------------------------------

function filtrarReservasCliente(reservas, clienteId) {
  let resultado = [];
  for (let i = 0; i < reservas.length; i++) {
    if (reservas[i].cliente.id === clienteId) {
      resultado.push(reservas[i]);
    }
  }
  return resultado;
}

function totalAprobadas(reservasCliente) {
  let total = 0;
  for (let i = 0; i < reservasCliente.length; i++) {
    let reserva = reservasCliente[i];
    if (reserva.estado === "aprobada") {
      total = total + reserva.montoConDescuento();
    }
  }
  return total;
}

// ------------------- VALIDACIONES CONCIERTOS EN OFERTA ---------------------------

function esOfertaActiva(concierto) {
  if (concierto.estado === "activo" && concierto.oferta === true && concierto.cupos > 0) {
    return true;
  }
  return false;
}
