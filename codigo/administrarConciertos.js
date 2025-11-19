// Página: Administrar Conciertos (Admin)

// Mostrar tabla dinámica de administrarConciertos
function mostrarTablaAdministrarConciertos() {
  let contenidoTabla = "";

  for (let i = 0; i < sistema.conciertos.length; i++) {
    const conciertos = sistema.conciertos[i];
    const isActivo = conciertos.estado === "activo";

    let checkedEstado = "";
    if (isActivo) {
      checkedEstado = "checked";
    }

    let activeEstado = "";
    if (isActivo) {
      activeEstado = "Activo";
    } else {
      activeEstado = "Pausado";
    }

    let checkedOferta = "";
    if (conciertos.oferta) {
      checkedOferta = "checked";
    }

    contenidoTabla += `<tr id="row_${conciertos.id}">
      <td>${conciertos.id}</td>
      <td>${conciertos.nombre}</td>
      <td>${conciertos.artista}</td>
      <td style="width:140px;"><input type="number" class="form-control" value="${conciertos.cupos}" min="0" data-field="cupos"></td>
      <td style="width:150px;">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" ${checkedEstado} data-field="estado">
          <label class="form-check-label">${activeEstado}</label>
        </div>
      </td>
      <td style="width:120px;">
        <input class="form-check-input" type="checkbox" ${checkedOferta} data-field="oferta">
      </td>
      <td style="width:160px;"><button class="btn btn-sm btn-mk btnGuardarConcierto" data-guardar="${conciertos.id}">Guardar</button></td>
    </tr>`;
  }
  document.querySelector("#tblAdminConciertos").innerHTML = contenidoTabla;

  // Agregar eventos a botones de guardar
  const botonesGuardar = document.querySelectorAll(".btnGuardarConcierto");

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

  const nuevosCupos = Number(cuposInput.value);
  let nuevoEstado = null;
  if (estadoInput.checked) {
    nuevoEstado = "activo";
  } else {
    nuevoEstado = "pausado";
  }

  let nuevoOferta = false;
  if (ofertaInput.checked) {
    nuevoOferta = true;
  } else {
    nuevoOferta = false;
  }

  //Actualizamos los datos del concierto
  sistema.actualizarConcierto(id, nuevosCupos, nuevoEstado, nuevoOferta);

  mostrarTablaAdministrarConciertos();
}
