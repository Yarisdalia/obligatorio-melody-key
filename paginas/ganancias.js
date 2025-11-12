// Página: Informe de Ganancias

function renderGanancias() {
  const totalEl = document.querySelector("#gananciaTotal");
  const tbl = document.querySelector("#tblGanancias");

  const datos = sistema.calcularGanancias();
  totalEl.textContent = "$ " + datos.total;

  let contenidoTabla = "";
  const keys = Object.keys(datos.detalle);

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const d = datos.detalle[k];
    contenidoTabla += `<tr>
      <td>${d.nombre}</td>
      <td class="text-center">${d.cantidad}</td>
      <td class="text-end">$ ${d.monto}</td>
    </tr>`;
  }

  tbl.innerHTML = contenidoTabla;
}
