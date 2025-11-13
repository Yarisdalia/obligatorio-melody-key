// Página: Reservar
document.querySelector("#btnSolicitaReserva").addEventListener("click", reservar);
function reservar() {
  const pMsg = document.querySelector("#pMensaje");
  const inputCantidad = document.querySelector("#txtCantidad");

  pMsg.textContent = "";
  const conciertoId = sistema.conciertoPreseleccionado;
  const cantidad = Number(inputCantidad.value);
  const res = sistema.solicitarReserva(sistema.usuarioLogueado.id, conciertoId, cantidad);
  pMsg.textContent = res.mensaje;

  if (res.exito) {
    mostrarSeccion("historial");
  }
}
