// Página: Ofertas

function renderOfertas() {
  const tbody = document.querySelector("#oferta tbody");
  let contenidoTabla = "";

  // Obtener conciertos en oferta (activos, con oferta=true, cupos>0)
  const ofertas = sistema.obtenerOfertas();

  for (let i = 0; i < ofertas.length; i++) {
    const concierto = ofertas[i];

    contenidoTabla += `<tr>
      <td>${concierto.nombre}</td>
      <td>${concierto.artista}</td>
      <td>${concierto.descripcion}</td>
      <td>${concierto.precio}</td>
      <td><img src="Img/${concierto.imagen}" alt="${concierto.artista}" width="80" class="rounded"></td>
      <td>${concierto.cupos}</td>
      <td><span class="badge text-bg-success">Sí</span></td>
      <td><button class="btn btn-sm btn-primary w-100 btnSolicitarOferta" data-sel="${concierto.id}">Solicitar reserva</button></td>
    </tr>`;
  }

  tbody.innerHTML = contenidoTabla;

  // Agregar eventos a los botones
  let botonesSolicitar = document.querySelectorAll(".btnSolicitarOferta");
  for (let i = 0; i < botonesSolicitar.length; i++) {
    const boton = botonesSolicitar[i];
    boton.addEventListener("click", seleccionarConciertoOferta);
  }
}

function seleccionarConciertoOferta() {
  sistema.conciertoPreseleccionado = this.getAttribute("data-sel");
  mostrarSeccion("reservar");
}
