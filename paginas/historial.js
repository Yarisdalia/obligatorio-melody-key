// Página: Historial
window.pages = window.pages || {};

function renderHistorial() {
  const system = window.app.system;
  const tbody = document.getElementById("tblHistorial");
  if (!tbody) return;
  tbody.innerHTML = "";
  const cliente = system.usuarioLogueado;
  if (!cliente || !(cliente instanceof Cliente)) {
    tbody.innerHTML = '<tr><td colspan="5">Debes iniciar sesión para ver tus reservas.</td></tr>';
    const saldoEl = document.getElementById("saldoDisponibleHistorial");
    if (saldoEl) saldoEl.textContent = "0";
    const totalAprob = document.getElementById("totalAprobadas");
    if (totalAprob) totalAprob.textContent = "0";
    return;
  }
  const misReservas = system.listarReservasCliente(cliente.id);
  for (let i = 0; i < misReservas.length; i++) {
    const r = misReservas[i];
    const estadoBadge =
      r.estado === "aprobada"
        ? '<span class="badge text-bg-success">Aprobada</span>'
        : r.estado === "pendiente"
          ? '<span class="badge text-bg-warning text-dark">Pendiente</span>'
          : '<span class="badge text-bg-danger">Cancelada</span>';
    const puedeCancelar = r.estado === "pendiente";
    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${r.concierto.nombre}</td>
                <td class="text-center">${r.cantidad}</td>
                <td class="text-center">${r.montoTotal()}</td>
                <td>${estadoBadge}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-cancel" data-reserva="${r.id}" ${puedeCancelar ? "" : "disabled"}>Cancelar</button>
                </td>
            `;
    tbody.appendChild(tr);
  }
  tbody.onclick = function (ev) {
    const btn = ev.target.closest("button[data-reserva]");
    if (!btn) return;
    const id = btn.getAttribute("data-reserva");
    const res = system.cancelarReserva(id, cliente.id);
    if (!res.exito) {
      alert(res.mensaje);
    }
    renderHistorial();
  };
  const saldoEl = document.getElementById("saldoDisponibleHistorial");
  if (saldoEl) saldoEl.textContent = String(cliente.saldo);
  const totalAprobEl = document.getElementById("totalAprobadas");
  if (totalAprobEl) totalAprobEl.textContent = String(system.totalAprobadasCliente(cliente.id));
}

window.pages.renderHistorial = renderHistorial;
