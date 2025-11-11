// Página: Informe de Ganancias
window.pages = window.pages || {};

function renderGanancias() {
  const system = window.app.system;
  const totalEl = document.getElementById("gananciaTotal");
  const tbl = document.getElementById("tblGanancias");
  if (!totalEl || !tbl) return;
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
  const btnMostrar = document.getElementById("btnMostrarTabla");
  if (btnMostrar) {
    btnMostrar.onclick = function () {
      const table = btnMostrar.closest(".card-body").querySelector("table");
      if (table) {
        const hidden = table.style.display === "none";
        table.style.display = hidden ? "" : "none";
      }
    };
  }
}

window.pages.renderGanancias = renderGanancias;
