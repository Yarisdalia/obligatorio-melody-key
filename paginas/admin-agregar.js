// Página: Admin - Agregar Concierto
function wireAdminAgregar() {
  const btn = document.getElementById("btnAgregarConcierto");
  const msg = document.getElementById("msgAgregarConcierto");

  btn.onclick = function () {
    // Obtener valores del formulario
    const nombre = document.getElementById("txtNombreEvento").value.trim();
    const artista = document.getElementById("txtArtista").value.trim();
    const precio = parseInt(document.getElementById("txtPrecio").value.trim(), 10);
    const cupos = parseInt(document.getElementById("txtCupos").value.trim(), 10);
    const descripcion = document.getElementById("txtDescripcion").value.trim();
    const fileImg = document.getElementById("fileImagen");
    const imagen = fileImg.files.length > 0 ? fileImg.files[0].name : "";
    const oferta = document.getElementById("chkOferta").checked;

    // Validar campos obligatorios
    if (!nombre || !artista || !descripcion || !precio || !cupos) {
      msg.textContent = "Los campos no pueden estar vacíos.";
      return;
    }

    // Crear concierto con estado "activo"
    system.agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, "activo", oferta);
    msg.textContent = "Concierto agregado.";

    // Limpiar formulario
    document.getElementById("txtNombreEvento").value = "";
    document.getElementById("txtArtista").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtCupos").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("fileImagen").value = "";
    document.getElementById("chkOferta").checked = false;

    // Actualizar otras vistas
    if (window.pages.renderAdminConciertos) window.pages.renderAdminConciertos();
    if (window.pages.renderExplorar) window.pages.renderExplorar();
    if (window.pages.renderOfertas) window.pages.renderOfertas();
  };
}
