// Página: Reservar

  document.querySelector("#btnSolicitaReserva").addEventListener("click", reservar);
  
  function reservar() {
  const mensaje = document.querySelector("#pMensaje");
  const inputCantidad = document.querySelector("#txtCantidad");

  mensaje.innerHTML = "";

  const conciertoId = sistema.conciertoPreseleccionado;
  const cantidad = Number(inputCantidad.value); //Convertimos el contenido en numero

  // Validar cantidad
  if (!validaCantidad(cantidad)) {
    mensaje.innerHTML = "El número de entradas debe ser mayor a 0";
    return;
  }

  const resultado = sistema.solicitarReserva(sistema.usuarioLogueado.id, conciertoId, cantidad);

  if (resultado === true) {
    mensaje.innerHTML = "Reserva registrada correctamente";
    mostrarSeccion("historial");
  } else {
    mensaje.innerHTML = "No se pudo registrar la reserva";
  }
}
 
