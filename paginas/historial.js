// Página: Historial

function renderHistorial() {
  const tbody = document.querySelector("#tblHistorial");
  const cliente = system.usuarioLogueado;

  tbody.innerHTML = "";

  // Obtener reservas del cliente
  const misReservas = system.listarReservasCliente(cliente.id);

  // Crear fila por cada reserva
  for (let i = 0; i < misReservas.length; i++) {
    const reserva = misReservas[i];

    // Definir badge según estado
    let estadoBadge = "";
    if (reserva.estado === "aprobada") {
      estadoBadge = '<span class="badge text-bg-success">Aprobada</span>';
    } else if (reserva.estado === "pendiente") {
      estadoBadge = '<span class="badge text-bg-warning text-dark">Pendiente</span>';
    } else {
      estadoBadge = '<span class="badge text-bg-danger">Cancelada</span>';
    }

    // Solo se puede cancelar si está pendiente
    let puedeCancelar = reserva.estado === "pendiente";

    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${reserva.concierto.nombre}</td>
                <td class="text-center">${reserva.cantidad}</td>
                <td class="text-center">${reserva.montoConDescuento()}</td>
                <td>${estadoBadge}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-cancel" data-reserva="${reserva.id}" ${puedeCancelar ? "" : "disabled"}>Cancelar</button>
                </td>
            `;
    tbody.appendChild(tr);
  }

  // Evento para cancelar reservas
  tbody.addEventListener("click", cancelarReserva);
  function cancelarReserva(ev) {
    const btn = ev.target.closest("button[data-reserva]");
    if (!btn) return;
    const id = btn.getAtjtribute("data-reserva");
    const res = system.cancelarReserva(id, cliente.id);
    renderHistorial();
  }

  // Actualizar saldo y total
  document.querySelector("#saldoDisponibleHistorial").textContent = cliente.saldo;
  document.querySelector("#totalAprobadas").textContent = system.totalAprobadasCliente(cliente.id);
}
