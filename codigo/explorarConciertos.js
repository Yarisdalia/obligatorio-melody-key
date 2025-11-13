// Página: Explorar

function mostrarTablaExplorar() {
  const tbody = document.querySelector("#tblConciertos");
  let contenidoTabla = "";

  // Obtener conciertos disponibles (activos con cupos > 0)
  const conciertos = sistema.explorarConciertosDisponibles();

  for (let i = 0; i < conciertos.length; i++) {
    const concierto = conciertos[i];

    // Definir badges
    let ofertaBadge = "";
    if (concierto.oferta) {
      ofertaBadge = '<span class="badge text-bg-success">Sí</span>';
    } else {
      ofertaBadge = '<span class="badge text-bg-secondary">No</span>';
    }

    let estadoBadge = "";
    if (concierto.estado === "activo") {
      estadoBadge = '<span class="badge text-bg-success">Activo</span>';
    } else {
      estadoBadge = '<span class="badge text-bg-secondary">Pausado</span>';
    }

    contenidoTabla += `<tr>
      <td>${concierto.nombre}</td>
      <td>${concierto.artista}</td>
      <td>${concierto.descripcion}</td>
      <td>${concierto.precio}</td>
      <td>${ofertaBadge}</td>
      <td><img src="Img/${concierto.imagen}" alt="${concierto.artista}" width="80" class="rounded"></td>
      <td>${concierto.cupos}</td>
      <td>${estadoBadge}</td>
      <td><button type="button" class="btn btn-sm btn-primary btnSeleccionarExplorar" data-concierto="${concierto.id}">Seleccionar Concierto</button></td>
    </tr>`;
  }

  tbody.innerHTML = contenidoTabla;

  // Agregar eventos a los botones
  let botonesSeleccionar = document.querySelectorAll(".btnSeleccionarExplorar");
  //Guardamos en botonesSeleccionar la seccion
  for (let i = 0; i < botonesSeleccionar.length; i++) {
    const boton = botonesSeleccionar[i];
    boton.addEventListener("click", seleccionarConciertoExplorar);
  }

}

//Identificamos el concierto seleccionado para mostrarlo en la pagina reservar
function seleccionarConciertoExplorar() {
  sistema.conciertoPreseleccionado = this.getAttribute("data-concierto");
  //Guarda a través del data - concierto, el concierto seleccionado
  mostrarSeccion("reservar");
  //Lo mostramos en la pagina reservar.
}
