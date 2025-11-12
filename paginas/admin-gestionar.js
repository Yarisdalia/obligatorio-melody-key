// Página: Admin - Administrar Conciertos
function renderAdminConciertos() {
  const tbody = document.querySelector("#tblAdminConciertos");
  if (!tbody) return;
  tbody.innerHTML = "";
  for (let i = 0; i < system.conciertos.length; i++) {
    const c = system.conciertos[i];
    const isActivo = c.estado === "activo";
    const rowId = `row_${c.id}`;
    const tr = document.createElement("tr");
    tr.id = rowId;
    tr.innerHTML = `
                <td>${c.id}</td>
                <td>${c.nombre}</td>
                <td>${c.artista}</td>
                <td style="width:140px;"><input type="number" class="form-control" value="${c.cupos}" min="0" data-field="cupos"></td>
                <td style="width:150px;">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" ${isActivo ? "checked" : ""} data-field="estado">
                    <label class="form-check-label">${isActivo ? "Activo" : "Pausado"}</label>
                  </div>
                </td>
                <td style="width:120px;">
                  <input class="form-check-input" type="checkbox" ${c.oferta ? "checked" : ""} data-field="oferta">
                </td>
                <td style="width:160px;"><button class="btn btn-sm btn-mk" data-guardar="${c.id}">Guardar</button></td>
            `;
    tbody.appendChild(tr);
  }
  tbody.addEventListener("click", guardar);

  function guardar(ev) {
    const btn = ev.target.closest("button[data-guardar]");
    if (!btn) return;
    const id = btn.getAttribute("data-guardar");
    const row = document.querySelector("#row_" + id);
    if (!row) return;
    const cuposInput = row.querySelector('input[data-field="cupos"]');
    const estadoInput = row.querySelector('input[data-field="estado"]');
    const ofertaInput = row.querySelector('input[data-field="oferta"]');
    const nuevosCupos = parseInt(cuposInput?.value || "0", 10);
    const nuevoEstado = estadoInput?.checked ? "activo" : "pausado";
    const oferta = !!ofertaInput?.checked;
    system.actualizarConcierto(id, {
      cupos: nuevosCupos,
      estado: nuevoEstado,
      oferta: oferta,
    });
    renderAdminConciertos();
  }
}
