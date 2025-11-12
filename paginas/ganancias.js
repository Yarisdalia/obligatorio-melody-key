// Página: Informe de Ganancias

function renderGanancias() {
  const totalEl = document.getElementById("gananciaTotal");
  const tbl = document.getElementById("tblGanancias");

  const datos = system.calcularGanancias();
  totalEl.textContent = "$ " + datos.total;

  tbl.innerHTML = "";
  const keys = Object.keys(datos.detalle);

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const d = datos.detalle[k];
    const tr = document.createElement("tr");
    tr.innerHTML = `
                <td>${d.nombre}</td>
                <td class="text-center">${d.cantidad}</td>
                <td class="text-end">$ ${d.monto}</td>
            `;
    tbl.appendChild(tr);
  }
}
