// Página: Ofertas
window.pages = window.pages || {};

function renderOfertas() {
  const system = window.app.system;
  const section = document.querySelector("#oferta");
  if (!section) return;
  const tbody = section.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const ofertas = system.obtenerOfertas();
  if (!ofertas || ofertas.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="8" class="text-center text-muted">No hay conciertos en oferta activos.</td>`;
    tbody.appendChild(tr);
    return;
  }
  for (let i = 0; i < ofertas.length; i++) {
    const c = ofertas[i];
    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${c.nombre}</td>
                <td>${c.artista}</td>
                <td>${c.descripcion}</td>
                <td>${c.precio}</td>
                <td><img src="Img/${c.imagen || "Ricky.jpg"}" alt="${c.artista}" width="80" class="rounded"></td>
                <td>${c.cupos}</td>
                <td><span class="badge text-bg-success">Sí</span></td>
                <td><button class="btn btn-sm btn-primary w-100" data-sel="${c.id}">Solicitar reserva</button></td>
            `;
    tbody.appendChild(tr);
  }
  tbody.onclick = function (ev) {
    const btn = ev.target.closest("button[data-sel]");
    if (!btn) return;
    window.app.preselectedConciertoId = btn.getAttribute("data-sel");
    window.location.hash = "#reservar";
  };
}

window.pages.renderOfertas = renderOfertas;
