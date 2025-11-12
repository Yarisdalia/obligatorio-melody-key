// Página: Admin - Administrar Conciertos

function renderAdminConciertos() {
  const tbody = document.querySelector("#tblAdminConciertos");
  let contenidoTabla = "";

  for (let i = 0; i < sistema.conciertos.length; i++) {
    const c = sistema.conciertos[i];
    const isActivo = c.estado === "activo";

    contenidoTabla += `<tr id="row_${c.id}">
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
      <td style="width:160px;"><button class="btn btn-sm btn-mk btnGuardarConcierto" data-guardar="${c.id}">Guardar</button></td>
    </tr>`;
  }

  tbody.innerHTML = contenidoTabla;

  // Agregar eventos a botones de guardar
  let botonesGuardar = document.querySelectorAll(".btnGuardarConcierto");
  for (let i = 0; i < botonesGuardar.length; i++) {
    const boton = botonesGuardar[i];
    boton.addEventListener("click", guardarConcierto);
  }
}

function guardarConcierto() {
  const id = this.getAttribute("data-guardar");
  const row = document.querySelector("#row_" + id);

  const cuposInput = row.querySelector('input[data-field="cupos"]');
  const estadoInput = row.querySelector('input[data-field="estado"]');
  const ofertaInput = row.querySelector('input[data-field="oferta"]');

  const nuevosCupos = parseInt(cuposInput.value, 10);
  const nuevoEstado = estadoInput.checked ? "activo" : "pausado";
  const oferta = ofertaInput.checked;

  sistema.actualizarConcierto(id, {
    cupos: nuevosCupos,
    estado: nuevoEstado,
    oferta: oferta,
  });

  renderAdminConciertos();
}
