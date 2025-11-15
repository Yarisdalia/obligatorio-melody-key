// Página: Reservar

  document.querySelector("#btnSolicitaReserva").addEventListener("click", reservar);
  
  function reservar() {
  const pMsg = document.querySelector("#pMensaje");
  const inputCantidad = document.querySelector("#txtCantidad");

  pMsg.innerHTML = "";

  const conciertoId = sistema.conciertoPreseleccionado;
  const cantidad = Number(inputCantidad.value);

  const resultado = sistema.solicitarReserva(sistema.usuarioLogueado.id, conciertoId, cantidad);

  if (resultado === true) {
    pMsg.innerHTML = "Reserva registrada correctamente.";
    mostrarSeccion("historial");
  } else {
    pMsg.innerHTML = "No se pudo registrar la reserva.";
  }
}
 
