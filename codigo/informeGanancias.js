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



// iMPACTATA EN SISTEMA.JS : CALCULAR GANANCIAS
/* REVISANDO SIMPLIFICAR (CODIGO BASICO), LA FUNCION MOSTRARTABLAGANANCIAS.

function mostraTablaGanancias() {
  const gananciaTotal = document.querySelector("#gananciaTotal");
  const tblGanancias = document.querySelector("#tblGanancias");

  // Ya no recibimos datos. Los tomamos del sistema.
  sistema.calcularGanancias();

  gananciaTotal.textContent = "$ " + sistema.totalGanancias;

  let contenidoTabla = "";
  let detalle = sistema.detalleGanancias;

  for (let i = 0; i < detalle.length; i++) {
    let d = detalle[i];

    contenidoTabla += `<tr>
      <td>${d.nombre}</td>
      <td class="text-center">${d.cantidad}</td>
      <td class="text-end">$ ${d.monto}</td>
    </tr>`;
  }

  tblGanancias.innerHTML = contenidoTabla;
} */
