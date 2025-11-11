// Página: Explorar
window.pages = window.pages || {};

function actualizarSaldoExplorar() {
  const el = document.getElementById("saldoExplorar");
  if (!el) return;
  const system = window.app.system;
  if (system.usuarioLogueado && system.usuarioLogueado.saldo != null) {
    el.textContent = system.usuarioLogueado.saldo;
  }
}

function renderExplorar() {
  const system = window.app.system;
  const tbody = document.getElementById("tblConciertos");
  if (!tbody) return;
  tbody.innerHTML = "";
  const conciertos = system.explorarConciertosDisponibles();
  if (!conciertos || conciertos.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="9" class="text-center text-muted">No hay conciertos disponibles por el momento.</td>`;
    tbody.appendChild(tr);
    actualizarSaldoExplorar();
    return;
  }
  for (let i = 0; i < conciertos.length; i++) {
    const c = conciertos[i];
    const ofertaBadge = c.oferta
      ? '<span class="badge text-bg-success">Sí</span>'
      : '<span class="badge text-bg-secondary">No</span>';
    const estadoBadge =
      c.estado === "activo"
        ? '<span class="badge text-bg-success">Activo</span>'
        : '<span class="badge text-bg-secondary">Pausado</span>';
    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${c.nombre}</td>
                <td>${c.artista}</td>
                <td>${c.descripcion}</td>
                <td>${c.precio}</td>
                <td>${ofertaBadge}</td>
                <td><img src="Img/${c.imagen || "Shakira.jpg"}" alt="${c.artista}" width="80" class="rounded"></td>
                <td>${c.cupos}</td>
                <td>${estadoBadge}</td>
                <td><button type="button" class="btn btn-sm btn-primary" data-concierto="${c.id}">Seleccionar Concierto</button></td>
            `;
    tbody.appendChild(tr);
  }
  tbody.onclick = function (ev) {
    const btn = ev.target.closest("button[data-concierto]");
    if (!btn) return;
    window.app.preselectedConciertoId = btn.getAttribute("data-concierto");
    window.location.hash = "#reservar";
  };
  actualizarSaldoExplorar();
}

window.pages.renderExplorar = renderExplorar;
