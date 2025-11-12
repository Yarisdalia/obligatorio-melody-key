// Página: Admin - Agregar Concierto
window.pages = window.pages || {};

function wireAdminAgregar() {
  const btn = document.getElementById("btnAgregarConcierto");
  const msg = document.getElementById("msgAgregarConcierto");
  if (!btn) return;
  btn.onclick = function () {
    const system = window.app.system;
    if (!(system.usuarioLogueado instanceof Administrador)) {
      if (msg) msg.textContent = "Debes iniciar sesión como administrador.";
      return;
    }
    var elNombre = document.getElementById("txtNombreEvento");
    var elArtista = document.getElementById("txtArtista");
    var elPrecio = document.getElementById("txtPrecio");
    var elCupos = document.getElementById("txtCupos");
    var elDescripcion = document.getElementById("txtDescripcion");
    const fileImg = document.getElementById("fileImagen");
    var elOferta = document.getElementById("chkOferta");
    const nombre = elNombre ? elNombre.value.trim() : "";
    const artista = elArtista ? elArtista.value.trim() : "";
    const precio = parseInt((elPrecio ? elPrecio.value : "").trim(), 10);
    const cupos = parseInt((elCupos ? elCupos.value : "").trim(), 10);
    const descripcion = elDescripcion ? elDescripcion.value.trim() : "";
    const oferta = elOferta ? !!elOferta.checked : false;
    const imagen = fileImg && fileImg.files && fileImg.files.length > 0 ? fileImg.files[0].name : "";
    if (!nombre || !artista || !descripcion || !precio || !cupos) {
      if (msg) msg.textContent = "Completa todos los campos.";
      return;
    }
    // Según la letra, al crear el concierto su estado debe ser "activo"
    const estado = "activo";
    system.agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, estado, oferta);
    if (msg) msg.textContent = "Concierto creado.";
    if (elNombre) elNombre.value = "";
    if (elArtista) elArtista.value = "";
    if (elPrecio) elPrecio.value = "";
    if (elCupos) elCupos.value = "";
    if (elDescripcion) elDescripcion.value = "";
    if (fileImg) fileImg.value = "";
    if (elOferta) elOferta.checked = false;
    if (window.pages.renderAdminConciertos) window.pages.renderAdminConciertos();
    if (window.pages.renderExplorar) window.pages.renderExplorar();
    if (window.pages.renderOfertas) window.pages.renderOfertas();
  };
}

window.pages.wireAdminAgregar = wireAdminAgregar;
