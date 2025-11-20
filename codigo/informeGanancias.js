// Página: Informe de Ganancias (Admin)

function mostraTablaGanancias() {
  const gananciaTotal = document.querySelector("#gananciaTotal");
  const tblGanancias = document.querySelector("#tblGanancias");

  const reservasAprobadas = sistema.listarReservasAprobadas();

  const total = sistema.calcularGananciasTotal();
  gananciaTotal.innerHTML = "$ " + total;

  let contenidoTabla = "";

  for (let i = 0; i < reservasAprobadas.length; i++) {
    const reserva = reservasAprobadas[i];
    contenidoTabla += `<tr>
      <td>${reserva.concierto.nombre}</td>
      <td class="text-center">${reserva.cantidad}</td>
      <td class="text-end">$ ${reserva.montoConDescuento()}</td>
    </tr>`;
  }

  tblGanancias.innerHTML = contenidoTabla;
}

