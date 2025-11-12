// Página: Admin - Procesar Reservas
function renderProcesarReservas() {
  // Limpiar tablas
  document.querySelector("#tblPendientes").innerHTML = "";
  document.querySelector("#tblAprobadas").innerHTML = "";
  document.querySelector("#tblCanceladas").innerHTML = "";

  // Recorrer todas las reservas
  for (let i = 0; i < system.reservas.length; i++) {
    const reserva = system.reservas[i];

    if (reserva.estado === "pendiente") {
      // Agregar a tabla de pendientes con botones
      const tr = document.createElement("tr");
      tr.innerHTML = `
                    <td>${reserva.cliente.usuario}</td>
                    <td>${reserva.concierto.artista}</td>
                    <td>${reserva.cantidad}</td>
                    <td>
                      <div class="btn-group">
                        <button class="btn btn-sm btn-approve" data-aprobar="${reserva.id}">Aprobar</button>
                        <button class="btn btn-sm btn-cancel" data-cancelar="${reserva.id}">Cancelar</button>
                      </div>
                    </td>
                `;
      document.querySelector("#tblPendientes").appendChild(tr);
    } else if (reserva.estado === "aprobada") {
      // Agregar a tabla de aprobadas
      const tr = document.createElement("tr");
      tr.innerHTML = `
                    <td>${reserva.cliente.usuario}</td>
                    <td>${reserva.concierto.nombre}</td>
                    <td>${reserva.cantidad}</td>
                `;
      document.querySelector("#tblAprobadas").appendChild(tr);
    } else if (reserva.estado === "cancelada") {
      // Agregar a tabla de canceladas
      const tr = document.createElement("tr");
      tr.innerHTML = `
                    <td>${reserva.cliente.usuario}</td>
                    <td>${reserva.concierto.nombre}</td>
                    <td>${reserva.cantidad}</td>
                `;
      document.querySelector("#tblCanceladas").appendChild(tr);
    }
  }

  // Evento para procesar reservas
  document.querySelector("#tblPendientes").addEventListener("click", procesar);
  function procesar(ev) {
    const btnAprobar = ev.target.closest("button[data-aprobar]");
    const btnCancelar = ev.target.closest("button[data-cancelar]");

    if (btnAprobar) {
      const id = btnAprobar.getAttribute("data-aprobar");
      const res = system.procesarReserva(id, "aprobar");
      alert(res.mensaje);
      renderProcesarReservas();
    } else if (btnCancelar) {
      const id = btnCancelar.getAttribute("data-cancelar");
      const res = system.procesarReserva(id, "cancelar");
      alert(res.mensaje);
      renderProcesarReservas();
    }
  }
}
