// Página: Historial

function mostrarTablaHistorial() {
  const tbody = document.querySelector("#tblHistorial");
  const cliente = sistema.usuarioLogueado;
  let contenidoTabla = "";

  // Obtener reservas del cliente
  const misReservas = sistema.listarReservasCliente(cliente.id);

  // Crear fila por cada reserva
  for (let i = 0; i < misReservas.length; i++) {
    const reserva = misReservas[i];

    // Definir badge según estado
    let estadoBadge = "";
    if (reserva.estado === "aprobada") {
      estadoBadge = '<span class="badge text-bg-success">Aprobada</span>';
    } else if (reserva.estado === "pendiente") {
      estadoBadge = '<span class="badge text-bg-warning text-dark">Pendiente</span>';
    } else {
      estadoBadge = '<span class="badge text-bg-danger">Cancelada</span>';
    }

    // Solo se puede cancelar si está pendiente
    let puedeCancelar = reserva.estado === "pendiente";

    contenidoTabla += `<tr>
      <td>${reserva.concierto.nombre}</td>
      <td class="text-center">${reserva.cantidad}</td>
      <td class="text-center">${reserva.montoConDescuento()}</td>
      <td>${estadoBadge}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-cancel btnCancelarReserva" data-reserva="${reserva.id}" ${puedeCancelar ? "" : "disabled"}>Cancelar</button>
      </td>
    </tr>`;
  }

  tbody.innerHTML = contenidoTabla;

  // Agregar eventos a los botones
  let botonesCancelar = document.querySelectorAll(".btnCancelarReserva");
  for (let i = 0; i < botonesCancelar.length; i++) {
    const boton = botonesCancelar[i];
    boton.addEventListener("click", cancelarReserva);
  }

  // Actualizar saldo y total
  document.querySelector("#saldoDisponibleHistorial").textContent = cliente.saldo;
  console.log(cliente.saldo);
  document.querySelector("#totalAprobadas").textContent = sistema.totalAprobadasCliente(cliente.id);
}

function cancelarReserva() {
  const id = this.getAttribute("data-reserva");
  const cliente = sistema.usuarioLogueado;
  const res = sistema.cancelarReserva(id, cliente.id);
  mostrarTablaHistorial();
}
