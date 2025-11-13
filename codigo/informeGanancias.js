// Página: Informe de Ganancias (Admin)

function mostraTablaGanancias() {
  const gananciaTotal = document.querySelector("#gananciaTotal");
  const tblGanancias = document.querySelector("#tblGanancias");

  const datos = sistema.calcularGanancias();
  gananciaTotal.textContent = "$ " + datos.total;

  let contenidoTabla = "";
  const keys = Object.keys(datos.detalle);

  console.log(datos)

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const d = datos.detalle[k];
    contenidoTabla += `<tr>
      <td>${d.nombre}</td>
      <td class="text-center">${d.cantidad}</td>
      <td class="text-end">$ ${d.monto}</td>
    </tr>`;
  }

  tblGanancias.innerHTML = contenidoTabla;
}
