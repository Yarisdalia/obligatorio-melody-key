// Página: Reservar
document.querySelector("#btnSolicitaReserva").addEventListener("click", reservar);
function renderReservar() {
  const select = document.querySelector("#slcConciertos");
  const inputCantidad = document.querySelector("#txtCantidad");
  const precioUnitario = document.querySelector("#precioUnitario");
  const cuposDisponibles = document.querySelector("#cuposDisponibles");

  // Rellenar select con conciertos activos
  select.innerHTML = "";
  const conciertosActivos = sistema.explorarConciertosDisponibles();

  let options = ""
  for (let i = 0; i < conciertosActivos.length; i++) {
    const actualConciertoActivo = conciertosActivos[i];
    options += `
      <option value={${actualConciertoActivo.id}}>
        ${actualConciertoActivo.nombre + " - " + actualConciertoActivo.artista}
      </option>
    `
  }
  select.innerHTML = options

  // Si hay un concierto preseleccionado
  if (sistema.conciertoPreseleccionado) {
    select.value = sistema.conciertoPreseleccionado;
    sistema.conciertoPreseleccionado = null;
  }

  function actualizarDetalle() {
    const seleccionado = obtenerConciertoSeleccionado();
    if (!seleccionado) return;

    precioUnitario.textContent = seleccionado.precio;
    cuposDisponibles.textContent = seleccionado.cupos;
  }

  select.onchange = actualizarDetalle;
  inputCantidad.oninput = actualizarDetalle;
  actualizarDetalle();
}

function obtenerConciertoSeleccionado() {
  const select = document.querySelector("#slcConciertos");
  const id = select.value;
  for (let i = 0; i < sistema.conciertos.length; i++) {
    if (sistema.conciertos[i].id === id) return sistema.conciertos[i];
  }
  return null;
}

function reservar() {
  const pMsg = document.querySelector("#pMensaje");
  const inputCantidad = document.querySelector("#txtCantidad");

  pMsg.textContent = "";
  const concierto = obtenerConciertoSeleccionado();
  const cantidad = Number(inputCantidad.value);
  const res = sistema.solicitarReserva(sistema.usuarioLogueado.id, concierto.id, cantidad);
  pMsg.textContent = res.mensaje;

  if (res.exito) {
    mostrarSeccion("historial");
  }
}
