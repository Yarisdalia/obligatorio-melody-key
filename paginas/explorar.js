// Página: Explorar

function renderExplorar() {
  const tbody = document.querySelector("#tblConciertos");

  tbody.innerHTML = "";

  // Obtener conciertos disponibles (activos con cupos > 0)
  const conciertos = system.explorarConciertosDisponibles();

  for (let i = 0; i < conciertos.length; i++) {
    const concierto = conciertos[i];

    // Definir badges
    const ofertaBadge = concierto.oferta ? '<span class="badge text-bg-success">Sí</span>' : '<span class="badge text-bg-secondary">No</span>';
    const estadoBadge = concierto.estado === "activo" ? '<span class="badge text-bg-success">Activo</span>' : '<span class="badge text-bg-secondary">Pausado</span>';

    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${concierto.nombre}</td>
                <td>${concierto.artista}</td>
                <td>${concierto.descripcion}</td>
                <td>${concierto.precio}</td>
                <td>${ofertaBadge}</td>
                <td><img src="Img/${concierto.imagen}" alt="${concierto.artista}" width="80" class="rounded"></td>
                <td>${concierto.cupos}</td>
                <td>${estadoBadge}</td>
                <td><button type="button" class="btn btn-sm btn-primary" data-concierto="${concierto.id}">Seleccionar Concierto</button></td>
            `;
    tbody.appendChild(tr);
  }

  // Evento para seleccionar concierto
  tbody.onclick = function (ev) {
    const btn = ev.target.closest("button[data-concierto]");
    if (!btn) return;
    system.conciertoPreseleccionado = btn.getAttribute("data-concierto");
    mostrarSeccion("reservar");
  };

  // Actualizar saldo
  document.querySelector("#saldoExplorar").textContent = system.usuarioLogueado.saldo;
}
