// Página: Reservar

function renderReservar() {
  const select = document.querySelector("#slcConciertos");
  const inputCantidad = document.querySelector("#txtCantidad");
  const txtMonto = document.querySelector("#montoTotal");
  const txtSaldo = document.querySelector("#saldoDisponible");
  const precioUnitario = document.querySelector("#precioUnitario");
  const cuposDisponibles = document.querySelector("#cuposDisponibles");

  // Rellenar select con conciertos activos
  select.innerHTML = "";
  const activos = system.explorarConciertosDisponibles();
  for (let i = 0; i < activos.length; i++) {
    const c = activos[i];
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nombre + " - " + c.artista;
    select.appendChild(opt);
  }

  // Si hay un concierto preseleccionado
  if (system.conciertoPreseleccionado) {
    select.value = system.conciertoPreseleccionado;
    system.conciertoPreseleccionado = null;
  }

  function obtenerConciertoSeleccionado() {
    const id = select.value;
    for (let i = 0; i < system.conciertos.length; i++) {
      if (system.conciertos[i].id === id) return system.conciertos[i];
    }
    return null;
  }
  function actualizarDetalle() {
    const seleccionado = obtenerConciertoSeleccionado();
    if (!seleccionado) return;

    precioUnitario.textContent = seleccionado.precio;
    cuposDisponibles.textContent = seleccionado.cupos;

    const cantidad = parseInt(inputCantidad.value, 10) || 0;
    const total = cantidad * seleccionado.precio;

    txtMonto.textContent = total;
    txtSaldo.textContent = system.usuarioLogueado.saldo;
  }

  select.onchange = actualizarDetalle;
  inputCantidad.oninput = actualizarDetalle;
  actualizarDetalle();

  // Botón solicitar reserva
  const btn = document.querySelector("#btnSolicitaReserva");
  const pMsg = document.querySelector("#pMensaje");

  btn.onclick = function () {
    pMsg.textContent = "";
    const concierto = obtenerConciertoSeleccionado();
    const cantidad = parseInt(inputCantidad.value, 10) || 0;
    const res = system.solicitarReserva(system.usuarioLogueado.id, concierto.id, cantidad);
    pMsg.textContent = res.mensaje;

    if (res.exito) {
      mostrarSeccion("historial");
    }
  };
}
