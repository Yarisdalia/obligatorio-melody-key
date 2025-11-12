// Página: Ofertas

function renderOfertas() {
  const tbody = document.querySelector("#oferta tbody");
  tbody.innerHTML = "";

  // Obtener conciertos en oferta (activos, con oferta=true, cupos>0)
  const ofertas = system.obtenerOfertas();

  for (let i = 0; i < ofertas.length; i++) {
    const concierto = ofertas[i];

    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${concierto.nombre}</td>
                <td>${concierto.artista}</td>
                <td>${concierto.descripcion}</td>
                <td>${concierto.precio}</td>
                <td><img src="Img/${concierto.imagen}" alt="${concierto.artista}" width="80" class="rounded"></td>
                <td>${concierto.cupos}</td>
                <td><span class="badge text-bg-success">Sí</span></td>
                <td><button class="btn btn-sm btn-primary w-100" data-sel="${concierto.id}">Solicitar reserva</button></td>
            `;
    tbody.appendChild(tr);
  }

  // Evento para seleccionar concierto
  tbody.onclick = function (ev) {
    const btn = ev.target.closest("button[data-sel]");
    if (!btn) return;
    system.conciertoPreseleccionado = btn.getAttribute("data-sel");
    window.location.hash = "#reservar";
  };
}
