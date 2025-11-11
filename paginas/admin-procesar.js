// Página: Admin - Procesar Reservas
window.pages = window.pages || {};

function renderProcesarReservas() {
  const system = window.app.system;
  const tPend = document.getElementById("tblPendientes");
  const tApr = document.getElementById("tblAprobadas");
  const tCan = document.getElementById("tblCanceladas");
  if (tPend) tPend.innerHTML = "";
  if (tApr) tApr.innerHTML = "";
  if (tCan) tCan.innerHTML = "";
  for (let i = 0; i < system.reservas.length; i++) {
    const r = system.reservas[i];
    if (r.estado === "pendiente" && tPend) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                    <td>${r.cliente.usuario}</td>
                    <td>${r.concierto.artista}</td>
                    <td>${r.cantidad}</td>
                    <td>
                      <div class="btn-group">
                        <button class="btn btn-sm btn-approve" data-aprobar="${r.id}">Aprobar</button>
                        <button class="btn btn-sm btn-cancel" data-cancelar="${r.id}">Cancelar</button>
                      </div>
                    </td>
                `;
      tPend.appendChild(tr);
    } else if (r.estado === "aprobada" && tApr) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${r.cliente.usuario}</td><td>${r.concierto.nombre}</td><td>${r.cantidad}</td>`;
      tApr.appendChild(tr);
    } else if (r.estado === "cancelada" && tCan) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${r.cliente.usuario}</td><td>${r.concierto.nombre}</td><td>${r.cantidad}</td>`;
      tCan.appendChild(tr);
    }
  }
  if (tPend) {
    tPend.onclick = function (ev) {
      const btnA = ev.target.closest("button[data-aprobar]");
      const btnC = ev.target.closest("button[data-cancelar]");
      if (!btnA && !btnC) return;
      const id = (btnA || btnC).getAttribute(
        btnA ? "data-aprobar" : "data-cancelar",
      );
      const accion = btnA ? "aprobar" : "cancelar";
      const res = system.procesarReserva(id, accion);
      if (!res.exito) {
        alert(res.mensaje);
      }
      renderProcesarReservas();
      if (window.pages.renderHistorial) window.pages.renderHistorial();
      if (window.pages.renderExplorar) window.pages.renderExplorar();
      if (window.pages.renderOfertas) window.pages.renderOfertas();
      if (window.pages.renderGanancias) window.pages.renderGanancias();
    };
  }
}

window.pages.renderProcesarReservas = renderProcesarReservas;
