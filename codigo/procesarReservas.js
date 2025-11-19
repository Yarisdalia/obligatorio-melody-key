// Página: Procesar Reservas (Admin)

function mostarTablaDeGestionarReservas() {
  let contenidoPendientes = "";
  let contenidoAprobadas = "";
  let contenidoCanceladas = "";

  // Recorrer todas las reservas
  for (let i = 0; i < sistema.reservas.length; i++) {
    const reserva = sistema.reservas[i];

    if (reserva.estado === "pendiente") {
      contenidoPendientes += `<tr>
        <td>${reserva.cliente.usuario}</td>
        <td>${reserva.concierto.artista}</td>
        <td>${reserva.cantidad}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-approve btnAprobar" data-aprobar="${reserva.id}">Aprobar</button>
            <button class="btn btn-sm btn-cancel btnCancelarAdmin" data-cancelar="${reserva.id}">Cancelar</button>
          </div>
        </td>
      </tr>`;
    } else if (reserva.estado === "aprobada") {
      contenidoAprobadas += `<tr>
        <td>${reserva.cliente.usuario}</td>
        <td>${reserva.concierto.nombre}</td>
        <td>${reserva.cantidad}</td>
      </tr>`;
    } else if (reserva.estado === "cancelada") {
      contenidoCanceladas += `<tr>
        <td>${reserva.cliente.usuario}</td>
        <td>${reserva.concierto.nombre}</td>
        <td>${reserva.cantidad}</td>
      </tr>`;
    }
  }

  document.querySelector("#tblPendientes").innerHTML = contenidoPendientes;
  document.querySelector("#tblAprobadas").innerHTML = contenidoAprobadas;
  document.querySelector("#tblCanceladas").innerHTML = contenidoCanceladas;

  // Agregar eventos a botones de aprobar
  let botonesAprobar = document.querySelectorAll(".btnAprobar");
  for (let i = 0; i < botonesAprobar.length; i++) {
    const boton = botonesAprobar[i];
    boton.addEventListener("click", aprobarReserva);
  }

  // Agregar eventos a botones de cancelar
  let botonesCancelar = document.querySelectorAll(".btnCancelarAdmin");
  for (let i = 0; i < botonesCancelar.length; i++) {
    const boton = botonesCancelar[i];
    boton.addEventListener("click", cancelarReservaAdmin);
  }
}

function aprobarReserva() {
  const id = this.getAttribute("data-aprobar");
  sistema.procesarReserva(id, "aprobar");
  mostarTablaDeGestionarReservas();
}

function cancelarReservaAdmin() {
  const id = this.getAttribute("data-cancelar");
  sistema.procesarReserva(id, "cancelar");
  mostarTablaDeGestionarReservas();
}
