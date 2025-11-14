// Página: Informe de Ganancias (Admin)

function mostraTablaGanancias() {
  const gananciaTotal = document.querySelector("#gananciaTotal");
  const tblGanancias = document.querySelector("#tblGanancias");

  const datos = sistema.calcularGanancias();
  gananciaTotal.innerHTML = "$ " + datos.total;

  let contenidoTabla = "";

  const detalles = datos.detalle;

  for (let i = 0; i < detalles.length; i++) {
    const d = detalles[i];
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
  const datos =sistema.calcularGanancias();

  gananciaTotal.innerHTML = "$ " + datos.total;

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
